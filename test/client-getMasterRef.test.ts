import test from "ava";
import * as mswNode from "msw/node";
import AbortController from "abort-controller";

import { createMockRepositoryHandler } from "./__testutils__/createMockRepositoryHandler";
import { createRepositoryResponse } from "./__testutils__/createRepositoryResponse";
import { createTestClient } from "./__testutils__/createClient";
import { createRef } from "./__testutils__/createRef";

const server = mswNode.setupServer();
test.before(() => server.listen({ onUnhandledRequest: "error" }));
test.after(() => server.close());

test("returns the master ref", async (t) => {
	const masterRef = createRef(true);
	const ref2 = createRef(false);
	const response = createRepositoryResponse({ refs: [ref2, masterRef] });
	server.use(createMockRepositoryHandler(t, response));

	const client = createTestClient(t);
	const res = await client.getMasterRef();

	t.deepEqual(res, masterRef);
});

test("is abortable with an AbortController", async (t) => {
	const repositoryResponse = createRepositoryResponse();

	server.use(createMockRepositoryHandler(t, repositoryResponse));

	const client = createTestClient(t);

	await t.throwsAsync(
		async () => {
			const controller = new AbortController();
			controller.abort();

			await client.getMasterRef({
				signal: controller.signal,
			});
		},
		{ name: "AbortError" },
	);
});
