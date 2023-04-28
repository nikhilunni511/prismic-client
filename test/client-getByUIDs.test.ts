import { testAbortableMethod } from "./__testutils__/testAbortableMethod";
import { testGetMethod } from "./__testutils__/testAnyGetMethod";
import { testConcurrentMethod } from "./__testutils__/testConcurrentMethod";

testGetMethod("queries for documents by UIDs", {
	run: (client) => client.getByUIDs("type", ["uid1", "uid2"]),
	requiredParams: {
		q: [
			`[[at(document.type, "type")]]`,
			`[[in(my.type.uid, ["uid1", "uid2"])]]`,
		],
	},
});

testGetMethod("includes params if provided", {
	run: (client) =>
		client.getByUIDs("type", ["uid1", "uid2"], {
			accessToken: "custom-accessToken",
			ref: "custom-ref",
			lang: "*",
		}),
	requiredParams: {
		access_token: "custom-accessToken",
		ref: "custom-ref",
		lang: "*",
		q: [
			`[[at(document.type, "type")]]`,
			`[[in(my.type.uid, ["uid1", "uid2"])]]`,
		],
	},
});

testAbortableMethod("is abortable with an AbortController", {
	run: (client, signal) =>
		client.getByUIDs("type", ["uid1", "uid2"], { signal }),
});

testConcurrentMethod("shares concurrent equivalent network requests", {
	run: (client, params) => client.getByUIDs("type", ["uid1", "uid2"], params),
	mode: "get",
});
