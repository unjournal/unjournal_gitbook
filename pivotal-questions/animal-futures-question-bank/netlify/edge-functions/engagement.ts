// site_engagement/node_modules/@netlify/runtime-utils/dist/main.js
var getString = (input) => typeof input === "string" ? input : JSON.stringify(input);
var base64Decode = globalThis.Buffer ? (input) => Buffer.from(input, "base64").toString() : (input) => atob(input);
var base64Encode = globalThis.Buffer ? (input) => Buffer.from(getString(input)).toString("base64") : (input) => btoa(getString(input));
var getEnvironment = () => {
  const { Deno, Netlify, process: process2 } = globalThis;
  return Netlify?.env ?? Deno?.env ?? {
    delete: (key) => delete process2?.env[key],
    get: (key) => process2?.env[key],
    has: (key) => Boolean(process2?.env[key]),
    set: (key, value) => {
      if (process2?.env) {
        process2.env[key] = value;
      }
    },
    toObject: () => process2?.env ?? {}
  };
};

// site_engagement/node_modules/@netlify/blobs/dist/chunk-YAGWSQMB.js
import process from "node:process";

// site_engagement/node_modules/@netlify/otel/dist/main.js
var GET_TRACER = "__netlify__getTracer";
var getTracer = (name, version) => {
  return globalThis[GET_TRACER]?.(name, version);
};
function withActiveSpan(tracer, name, optionsOrFn, contextOrFn, fn) {
  const func = typeof contextOrFn === "function" ? contextOrFn : typeof optionsOrFn === "function" ? optionsOrFn : fn;
  if (!func) {
    throw new Error("function to execute with active span is missing");
  }
  if (!tracer) {
    return func();
  }
  return tracer.withActiveSpan(name, optionsOrFn, contextOrFn, func);
}

// site_engagement/node_modules/@netlify/blobs/dist/chunk-YAGWSQMB.js
var getEnvironmentContext = () => {
  const context = globalThis.netlifyBlobsContext || getEnvironment().get("NETLIFY_BLOBS_CONTEXT");
  if (typeof context !== "string" || !context) {
    return {};
  }
  const data = base64Decode(context);
  try {
    return JSON.parse(data);
  } catch {
  }
  return {};
};
var MissingBlobsEnvironmentError = class extends Error {
  constructor(requiredProperties) {
    super(
      `The environment has not been configured to use Netlify Blobs. To use it manually, supply the following properties when creating a store: ${requiredProperties.join(
        ", "
      )}`
    );
    this.name = "MissingBlobsEnvironmentError";
  }
};
var BASE64_PREFIX = "b64;";
var METADATA_HEADER_INTERNAL = "x-amz-meta-user";
var METADATA_HEADER_EXTERNAL = "netlify-blobs-metadata";
var METADATA_MAX_SIZE = 2 * 1024;
var encodeMetadata = (metadata) => {
  if (!metadata) {
    return null;
  }
  const encodedObject = base64Encode(JSON.stringify(metadata));
  const payload = `b64;${encodedObject}`;
  if (METADATA_HEADER_EXTERNAL.length + payload.length > METADATA_MAX_SIZE) {
    throw new Error("Metadata object exceeds the maximum size");
  }
  return payload;
};
var decodeMetadata = (header) => {
  if (!header?.startsWith(BASE64_PREFIX)) {
    return {};
  }
  const encodedData = header.slice(BASE64_PREFIX.length);
  const decodedData = base64Decode(encodedData);
  const metadata = JSON.parse(decodedData);
  return metadata;
};
var getMetadataFromResponse = (response) => {
  if (!response.headers) {
    return {};
  }
  const value = response.headers.get(METADATA_HEADER_EXTERNAL) || response.headers.get(METADATA_HEADER_INTERNAL);
  try {
    return decodeMetadata(value);
  } catch {
    throw new Error(
      "An internal error occurred while trying to retrieve the metadata for an entry. Please try updating to the latest version of the Netlify Blobs client."
    );
  }
};
var NF_ERROR = "x-nf-error";
var NF_REQUEST_ID = "x-nf-request-id";
var BlobsInternalError = class extends Error {
  constructor(res) {
    let details = res.headers.get(NF_ERROR) || `${res.status} status code`;
    if (res.headers.has(NF_REQUEST_ID)) {
      details += `, ID: ${res.headers.get(NF_REQUEST_ID)}`;
    }
    super(`Netlify Blobs has generated an internal error (${details})`);
    this.name = "BlobsInternalError";
  }
};
var collectIterator = async (iterator) => {
  const result = [];
  for await (const item of iterator) {
    result.push(item);
  }
  return result;
};
function withSpan(span, name, fn) {
  if (span) return fn(span);
  return withActiveSpan(getTracer(), name, (span2) => {
    return fn(span2);
  });
}
var BlobsConsistencyError = class extends Error {
  constructor() {
    super(
      `Netlify Blobs has failed to perform a read using strong consistency because the environment has not been configured with a 'uncachedEdgeURL' property`
    );
    this.name = "BlobsConsistencyError";
  }
};
var regions = {
  "us-east-1": true,
  "us-east-2": true,
  "eu-central-1": true,
  "ap-southeast-1": true,
  "ap-southeast-2": true
};
var isValidRegion = (input) => Object.keys(regions).includes(input);
var InvalidBlobsRegionError = class extends Error {
  constructor(region) {
    super(
      `${region} is not a supported Netlify Blobs region. Supported values are: ${Object.keys(regions).join(", ")}.`
    );
    this.name = "InvalidBlobsRegionError";
  }
};
var DEFAULT_RETRY_DELAY = getEnvironment().get("NODE_ENV") === "test" ? 1 : 5e3;
var MIN_RETRY_DELAY = 1e3;
var MAX_RETRY = 5;
var RATE_LIMIT_HEADER = "X-RateLimit-Reset";
var fetchAndRetry = async (fetch, url, options, attemptsLeft = MAX_RETRY) => {
  try {
    const res = await fetch(url, options);
    if (attemptsLeft > 0 && (res.status === 429 || res.status >= 500)) {
      const delay = getDelay(res.headers.get(RATE_LIMIT_HEADER));
      await sleep(delay);
      return fetchAndRetry(fetch, url, options, attemptsLeft - 1);
    }
    return res;
  } catch (error) {
    if (attemptsLeft === 0) {
      throw error;
    }
    const delay = getDelay();
    await sleep(delay);
    return fetchAndRetry(fetch, url, options, attemptsLeft - 1);
  }
};
var getDelay = (rateLimitReset) => {
  if (!rateLimitReset) {
    return DEFAULT_RETRY_DELAY;
  }
  return Math.max(Number(rateLimitReset) * 1e3 - Date.now(), MIN_RETRY_DELAY);
};
var sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
var SIGNED_URL_ACCEPT_HEADER = "application/json;type=signed-url";
var Client = class {
  constructor({ apiURL, consistency, edgeURL, fetch, region, siteID, token, uncachedEdgeURL }) {
    this.apiURL = apiURL;
    this.consistency = consistency ?? "eventual";
    this.edgeURL = edgeURL;
    this.fetch = fetch ?? globalThis.fetch;
    this.region = region;
    this.siteID = siteID;
    this.token = token;
    this.uncachedEdgeURL = uncachedEdgeURL;
    if (!this.fetch) {
      throw new Error(
        "Netlify Blobs could not find a `fetch` client in the global scope. You can either update your runtime to a version that includes `fetch` (like Node.js 18.0.0 or above), or you can supply your own implementation using the `fetch` property."
      );
    }
  }
  async getFinalRequest({
    consistency: opConsistency,
    key,
    metadata,
    method,
    parameters = {},
    storeName
  }) {
    const encodedMetadata = encodeMetadata(metadata);
    const consistency = opConsistency ?? this.consistency;
    let urlPath = `/${this.siteID}`;
    if (storeName) {
      urlPath += `/${storeName}`;
    }
    if (key) {
      urlPath += `/${key}`;
    }
    if (this.edgeURL) {
      if (consistency === "strong" && !this.uncachedEdgeURL) {
        throw new BlobsConsistencyError();
      }
      const headers2 = {
        authorization: `Bearer ${this.token}`
      };
      if (encodedMetadata) {
        headers2[METADATA_HEADER_INTERNAL] = encodedMetadata;
      }
      if (this.region) {
        urlPath = `/region:${this.region}${urlPath}`;
      }
      const url2 = new URL(urlPath, consistency === "strong" ? this.uncachedEdgeURL : this.edgeURL);
      for (const key2 in parameters) {
        url2.searchParams.set(key2, parameters[key2]);
      }
      return {
        headers: headers2,
        url: url2.toString()
      };
    }
    const apiHeaders = { authorization: `Bearer ${this.token}` };
    const url = new URL(`/api/v1/blobs${urlPath}`, this.apiURL ?? "https://api.netlify.com");
    for (const key2 in parameters) {
      url.searchParams.set(key2, parameters[key2]);
    }
    if (this.region) {
      url.searchParams.set("region", this.region);
    }
    if (storeName === void 0 || key === void 0) {
      return {
        headers: apiHeaders,
        url: url.toString()
      };
    }
    if (encodedMetadata) {
      apiHeaders[METADATA_HEADER_EXTERNAL] = encodedMetadata;
    }
    if (method === "head" || method === "delete") {
      return {
        headers: apiHeaders,
        url: url.toString()
      };
    }
    const res = await this.fetch(url.toString(), {
      headers: { ...apiHeaders, accept: SIGNED_URL_ACCEPT_HEADER },
      method
    });
    if (res.status !== 200) {
      throw new BlobsInternalError(res);
    }
    const { url: signedURL } = await res.json();
    const userHeaders = encodedMetadata ? { [METADATA_HEADER_INTERNAL]: encodedMetadata } : void 0;
    return {
      headers: userHeaders,
      url: signedURL
    };
  }
  async makeRequest({
    body,
    conditions = {},
    consistency,
    headers: extraHeaders,
    key,
    metadata,
    method,
    parameters,
    storeName
  }) {
    const { headers: baseHeaders = {}, url } = await this.getFinalRequest({
      consistency,
      key,
      metadata,
      method,
      parameters,
      storeName
    });
    const headers2 = {
      ...baseHeaders,
      ...extraHeaders
    };
    if (method === "put") {
      headers2["cache-control"] = "max-age=0, stale-while-revalidate=60";
    }
    if ("onlyIfMatch" in conditions && conditions.onlyIfMatch) {
      headers2["if-match"] = conditions.onlyIfMatch;
    } else if ("onlyIfNew" in conditions && conditions.onlyIfNew) {
      headers2["if-none-match"] = "*";
    }
    const options = {
      body,
      headers: headers2,
      method
    };
    if (body instanceof ReadableStream) {
      options.duplex = "half";
    }
    return fetchAndRetry(this.fetch, url, options);
  }
};
var getClientOptions = (options, contextOverride) => {
  const context = contextOverride ?? getEnvironmentContext();
  const siteID = context.siteID ?? options.siteID;
  const token = context.token ?? options.token;
  if (!siteID || !token) {
    throw new MissingBlobsEnvironmentError(["siteID", "token"]);
  }
  if (options.region !== void 0 && !isValidRegion(options.region)) {
    throw new InvalidBlobsRegionError(options.region);
  }
  const clientOptions = {
    apiURL: context.apiURL ?? options.apiURL,
    consistency: options.consistency,
    edgeURL: context.edgeURL ?? options.edgeURL,
    fetch: options.fetch,
    region: options.region,
    siteID,
    token,
    uncachedEdgeURL: context.uncachedEdgeURL ?? options.uncachedEdgeURL
  };
  return clientOptions;
};

// site_engagement/node_modules/@netlify/blobs/dist/main.js
var DEPLOY_STORE_PREFIX = "deploy:";
var LEGACY_STORE_INTERNAL_PREFIX = "netlify-internal/legacy-namespace/";
var SITE_STORE_PREFIX = "site:";
var STATUS_OK = 200;
var STATUS_PRE_CONDITION_FAILED = 412;
var Store = class _Store {
  constructor(options) {
    this.client = options.client;
    if ("deployID" in options) {
      _Store.validateDeployID(options.deployID);
      let name = DEPLOY_STORE_PREFIX + options.deployID;
      if (options.name) {
        name += `:${options.name}`;
      }
      this.name = name;
    } else if (options.name.startsWith(LEGACY_STORE_INTERNAL_PREFIX)) {
      const storeName = options.name.slice(LEGACY_STORE_INTERNAL_PREFIX.length);
      _Store.validateStoreName(storeName);
      this.name = storeName;
    } else {
      _Store.validateStoreName(options.name);
      this.name = SITE_STORE_PREFIX + options.name;
    }
  }
  async delete(key) {
    const res = await this.client.makeRequest({ key, method: "delete", storeName: this.name });
    if (![200, 204, 404].includes(res.status)) {
      throw new BlobsInternalError(res);
    }
  }
  async deleteAll() {
    let totalDeletedBlobs = 0;
    let hasMore = true;
    while (hasMore) {
      const res = await this.client.makeRequest({ method: "delete", storeName: this.name });
      if (res.status !== 200) {
        throw new BlobsInternalError(res);
      }
      const data = await res.json();
      if (typeof data.blobs_deleted !== "number") {
        throw new BlobsInternalError(res);
      }
      totalDeletedBlobs += data.blobs_deleted;
      hasMore = typeof data.has_more === "boolean" && data.has_more;
    }
    return {
      deletedBlobs: totalDeletedBlobs
    };
  }
  async get(key, options) {
    return withSpan(options?.span, "blobs.get", async (span) => {
      const { consistency, type } = options ?? {};
      span?.setAttributes({
        "blobs.store": this.name,
        "blobs.key": key,
        "blobs.type": type,
        "blobs.method": "GET",
        "blobs.consistency": consistency
      });
      const res = await this.client.makeRequest({
        consistency,
        key,
        method: "get",
        storeName: this.name
      });
      span?.setAttributes({
        "blobs.response.body.size": res.headers.get("content-length") ?? void 0,
        "blobs.response.status": res.status
      });
      if (res.status === 404) {
        return null;
      }
      if (res.status !== 200) {
        throw new BlobsInternalError(res);
      }
      if (type === void 0 || type === "text") {
        return res.text();
      }
      if (type === "arrayBuffer") {
        return res.arrayBuffer();
      }
      if (type === "blob") {
        return res.blob();
      }
      if (type === "json") {
        return res.json();
      }
      if (type === "stream") {
        return res.body;
      }
      throw new BlobsInternalError(res);
    });
  }
  async getMetadata(key, options = {}) {
    return withSpan(options?.span, "blobs.getMetadata", async (span) => {
      span?.setAttributes({
        "blobs.store": this.name,
        "blobs.key": key,
        "blobs.method": "HEAD",
        "blobs.consistency": options.consistency
      });
      const res = await this.client.makeRequest({
        consistency: options.consistency,
        key,
        method: "head",
        storeName: this.name
      });
      span?.setAttributes({
        "blobs.response.status": res.status
      });
      if (res.status === 404) {
        return null;
      }
      if (res.status !== 200 && res.status !== 304) {
        throw new BlobsInternalError(res);
      }
      const etag = res?.headers.get("etag") ?? void 0;
      const metadata = getMetadataFromResponse(res);
      const result = {
        etag,
        metadata
      };
      return result;
    });
  }
  async getWithMetadata(key, options) {
    return withSpan(options?.span, "blobs.getWithMetadata", async (span) => {
      const { consistency, etag: requestETag, type } = options ?? {};
      const headers2 = requestETag ? { "if-none-match": requestETag } : void 0;
      span?.setAttributes({
        "blobs.store": this.name,
        "blobs.key": key,
        "blobs.method": "GET",
        "blobs.consistency": options?.consistency,
        "blobs.type": type,
        "blobs.request.etag": requestETag
      });
      const res = await this.client.makeRequest({
        consistency,
        headers: headers2,
        key,
        method: "get",
        storeName: this.name
      });
      const responseETag = res?.headers.get("etag") ?? void 0;
      span?.setAttributes({
        "blobs.response.body.size": res.headers.get("content-length") ?? void 0,
        "blobs.response.etag": responseETag,
        "blobs.response.status": res.status
      });
      if (res.status === 404) {
        return null;
      }
      if (res.status !== 200 && res.status !== 304) {
        throw new BlobsInternalError(res);
      }
      const metadata = getMetadataFromResponse(res);
      const result = {
        etag: responseETag,
        metadata
      };
      if (res.status === 304 && requestETag) {
        return { data: null, ...result };
      }
      if (type === void 0 || type === "text") {
        return { data: await res.text(), ...result };
      }
      if (type === "arrayBuffer") {
        return { data: await res.arrayBuffer(), ...result };
      }
      if (type === "blob") {
        return { data: await res.blob(), ...result };
      }
      if (type === "json") {
        return { data: await res.json(), ...result };
      }
      if (type === "stream") {
        return { data: res.body, ...result };
      }
      throw new Error(`Invalid 'type' property: ${type}. Expected: arrayBuffer, blob, json, stream, or text.`);
    });
  }
  list(options = {}) {
    return withSpan(options.span, "blobs.list", (span) => {
      span?.setAttributes({
        "blobs.store": this.name,
        "blobs.method": "GET",
        "blobs.list.paginate": options.paginate ?? false
      });
      const iterator = this.getListIterator(options);
      if (options.paginate) {
        return iterator;
      }
      return collectIterator(iterator).then(
        (items) => items.reduce(
          (acc, item) => ({
            blobs: [...acc.blobs, ...item.blobs],
            directories: [...acc.directories, ...item.directories]
          }),
          { blobs: [], directories: [] }
        )
      );
    });
  }
  async set(key, data, options = {}) {
    return withSpan(options.span, "blobs.set", async (span) => {
      span?.setAttributes({
        "blobs.store": this.name,
        "blobs.key": key,
        "blobs.method": "PUT",
        "blobs.data.size": typeof data == "string" ? data.length : data instanceof Blob ? data.size : data.byteLength,
        "blobs.data.type": typeof data == "string" ? "string" : data instanceof Blob ? "blob" : "arrayBuffer",
        "blobs.atomic": Boolean(options.onlyIfMatch ?? options.onlyIfNew)
      });
      _Store.validateKey(key);
      const conditions = _Store.getConditions(options);
      const res = await this.client.makeRequest({
        conditions,
        body: data,
        key,
        metadata: options.metadata,
        method: "put",
        storeName: this.name
      });
      const etag = res.headers.get("etag") ?? "";
      span?.setAttributes({
        "blobs.response.etag": etag,
        "blobs.response.status": res.status
      });
      if (conditions) {
        return res.status === STATUS_PRE_CONDITION_FAILED ? { modified: false } : { etag, modified: true };
      }
      if (res.status === STATUS_OK) {
        return {
          etag,
          modified: true
        };
      }
      throw new BlobsInternalError(res);
    });
  }
  async setJSON(key, data, options = {}) {
    return withSpan(options.span, "blobs.setJSON", async (span) => {
      span?.setAttributes({
        "blobs.store": this.name,
        "blobs.key": key,
        "blobs.method": "PUT",
        "blobs.data.type": "json"
      });
      _Store.validateKey(key);
      const conditions = _Store.getConditions(options);
      const payload = JSON.stringify(data);
      const headers2 = {
        "content-type": "application/json"
      };
      const res = await this.client.makeRequest({
        ...conditions,
        body: payload,
        headers: headers2,
        key,
        metadata: options.metadata,
        method: "put",
        storeName: this.name
      });
      const etag = res.headers.get("etag") ?? "";
      span?.setAttributes({
        "blobs.response.etag": etag,
        "blobs.response.status": res.status
      });
      if (conditions) {
        return res.status === STATUS_PRE_CONDITION_FAILED ? { modified: false } : { etag, modified: true };
      }
      if (res.status === STATUS_OK) {
        return {
          etag,
          modified: true
        };
      }
      throw new BlobsInternalError(res);
    });
  }
  static formatListResultBlob(result) {
    if (!result.key) {
      return null;
    }
    return {
      etag: result.etag,
      key: result.key
    };
  }
  static getConditions(options) {
    if ("onlyIfMatch" in options && "onlyIfNew" in options) {
      throw new Error(
        `The 'onlyIfMatch' and 'onlyIfNew' options are mutually exclusive. Using 'onlyIfMatch' will make the write succeed only if there is an entry for the key with the given content, while 'onlyIfNew' will make the write succeed only if there is no entry for the key.`
      );
    }
    if ("onlyIfMatch" in options && options.onlyIfMatch) {
      if (typeof options.onlyIfMatch !== "string") {
        throw new Error(`The 'onlyIfMatch' property expects a string representing an ETag.`);
      }
      return {
        onlyIfMatch: options.onlyIfMatch
      };
    }
    if ("onlyIfNew" in options && options.onlyIfNew) {
      if (typeof options.onlyIfNew !== "boolean") {
        throw new Error(
          `The 'onlyIfNew' property expects a boolean indicating whether the write should fail if an entry for the key already exists.`
        );
      }
      return {
        onlyIfNew: true
      };
    }
  }
  static validateKey(key) {
    if (key === "") {
      throw new Error("Blob key must not be empty.");
    }
    if (key.startsWith("/") || key.startsWith("%2F")) {
      throw new Error("Blob key must not start with forward slash (/).");
    }
    if (new TextEncoder().encode(key).length > 600) {
      throw new Error(
        "Blob key must be a sequence of Unicode characters whose UTF-8 encoding is at most 600 bytes long."
      );
    }
  }
  static validateDeployID(deployID) {
    if (!/^\w{1,24}$/.test(deployID)) {
      throw new Error(`'${deployID}' is not a valid Netlify deploy ID.`);
    }
  }
  static validateStoreName(name) {
    if (name.includes("/") || name.includes("%2F")) {
      throw new Error("Store name must not contain forward slashes (/).");
    }
    if (new TextEncoder().encode(name).length > 64) {
      throw new Error(
        "Store name must be a sequence of Unicode characters whose UTF-8 encoding is at most 64 bytes long."
      );
    }
  }
  getListIterator(options) {
    const { client, name: storeName } = this;
    const parameters = {};
    if (options?.prefix) {
      parameters.prefix = options.prefix;
    }
    if (options?.directories) {
      parameters.directories = "true";
    }
    return {
      [Symbol.asyncIterator]() {
        let currentCursor = null;
        let done = false;
        return {
          async next() {
            return withSpan(options?.span, "blobs.list.next", async (span) => {
              span?.setAttributes({
                "blobs.store": storeName,
                "blobs.method": "GET",
                "blobs.list.paginate": options?.paginate ?? false,
                "blobs.list.done": done,
                "blobs.list.cursor": currentCursor ?? void 0
              });
              if (done) {
                return { done: true, value: void 0 };
              }
              const nextParameters = { ...parameters };
              if (currentCursor !== null) {
                nextParameters.cursor = currentCursor;
              }
              const res = await client.makeRequest({
                method: "get",
                parameters: nextParameters,
                storeName
              });
              span?.setAttributes({
                "blobs.response.status": res.status
              });
              let blobs = [];
              let directories = [];
              if (![200, 204, 404].includes(res.status)) {
                throw new BlobsInternalError(res);
              }
              if (res.status === 404) {
                done = true;
              } else {
                const page = await res.json();
                if (page.next_cursor) {
                  currentCursor = page.next_cursor;
                } else {
                  done = true;
                }
                blobs = (page.blobs ?? []).map(_Store.formatListResultBlob).filter(Boolean);
                directories = page.directories ?? [];
              }
              return {
                done: false,
                value: {
                  blobs,
                  directories
                }
              };
            });
          }
        };
      }
    };
  }
};
var getStore = (input, options) => {
  if (typeof input === "string") {
    const contextOverride = options?.siteID && options?.token ? { siteID: options?.siteID, token: options?.token } : void 0;
    const clientOptions = getClientOptions(options ?? {}, contextOverride);
    const client = new Client(clientOptions);
    return new Store({ client, name: input });
  }
  if (typeof input?.name === "string") {
    const { name } = input;
    const contextOverride = input?.siteID && input?.token ? { siteID: input?.siteID, token: input?.token } : void 0;
    const clientOptions = getClientOptions(input, contextOverride);
    if (!name) {
      throw new MissingBlobsEnvironmentError(["name"]);
    }
    const client = new Client(clientOptions);
    return new Store({ client, name });
  }
  if (typeof input?.deployID === "string") {
    const clientOptions = getClientOptions(input);
    const { deployID } = input;
    if (!deployID) {
      throw new MissingBlobsEnvironmentError(["deployID"]);
    }
    const client = new Client(clientOptions);
    return new Store({ client, deployID });
  }
  throw new Error(
    "The `getStore` method requires the name of the store as a string or as the `name` property of an options object"
  );
};

// site_engagement/tracking_registry.json
var tracking_registry_default = {
  sites: [
    {
      key: "projects_hub",
      name: "Projects hub",
      site_id: "f2806ac7-c126-4f99-81b8-929c551d7eee",
      url: "https://projects.davidreinstein.org",
      started_at: "2026-10-01",
      routes: {
        "/": {
          label: "home",
          type: "html"
        },
        "/index.html": {
          label: "home",
          type: "html"
        }
      },
      group: "Reinstein"
    },
    {
      key: "exeter_jazz_calendar",
      name: "Exeter jazz calendar",
      site_id: "edaf2f11-d79d-4dcf-aff8-f6f552410470",
      url: "https://exeter-jazz-calendar.netlify.app",
      started_at: "2026-10-01",
      routes: {
        "/": {
          label: "calendar",
          type: "html"
        },
        "/index.html": {
          label: "calendar",
          type: "html"
        },
        "/calendar.ics": {
          label: "calendar_feed",
          type: "feed"
        }
      },
      group: "Reinstein"
    },
    {
      key: "impact_directory",
      name: "Impact Products Directory",
      site_id: "78da1569-75bd-4690-8f8f-e20cd14b5720",
      url: "https://impact-products-directory.netlify.app",
      started_at: "2026-10-01",
      routes: {
        "/": {
          label: "home",
          type: "html"
        },
        "/search": {
          label: "search",
          type: "html"
        },
        "/about": {
          label: "about",
          type: "html"
        },
        "/sources": {
          label: "sources",
          type: "html"
        },
        "/faq": {
          label: "faq",
          type: "html"
        }
      },
      group: "Reinstein"
    },
    {
      key: "animal_futures_questions",
      name: "Animal Futures question bank",
      site_id: "1f88823c-92c8-432c-9b63-36717853a66f",
      url: "https://uj-animal-futures-questions.netlify.app",
      started_at: "2026-10-01",
      routes: {
        "/": {
          label: "question_bank",
          type: "html"
        },
        "/index.html": {
          label: "question_bank",
          type: "html"
        }
      },
      group: "Unjournal"
    },
    {
      key: "animal_futures_update",
      name: "Animal Futures update",
      site_id: "be7830b5-b011-4d32-8437-4c21d4275b8f",
      url: "https://uj-animal-futures-update.netlify.app",
      started_at: "2026-10-01",
      routes: {
        "/": {
          label: "update",
          type: "html"
        },
        "/index.html": {
          label: "update",
          type: "html"
        },
        "/report": {
          label: "short_report",
          type: "html"
        },
        "/report.html": {
          label: "short_report",
          type: "html"
        },
        "/feed.xml": {
          label: "rss_feed",
          type: "feed"
        }
      },
      group: "Unjournal"
    },
    {
      key: "personal_website",
      name: "David Reinstein website",
      group: "Reinstein",
      site_id: "b25b31a7-3e72-4394-820d-db983d98b448",
      url: "https://www.davidreinstein.org",
      started_at: "2026-10-01",
      routes: {
        "/": {
          label: "home",
          type: "html"
        },
        "/about/": {
          label: "about",
          type: "html"
        },
        "/projects/": {
          label: "projects",
          type: "html"
        },
        "/projects/tools-and-apps/": {
          label: "tools",
          type: "html"
        },
        "/posts/": {
          label: "posts",
          type: "html"
        },
        "/cv/": {
          label: "cv",
          type: "html"
        },
        "/podcasts/": {
          label: "podcasts",
          type: "html"
        }
      }
    }
  ]
};

// site_engagement/edge-functions/engagement.ts
var DASHBOARD = "https://reinstein-site-engagement.netlify.app";
var BOT = /bot|crawler|spider|slurp|headless|facebookexternalhit|preview|curl|wget/i;
var AUDIT = /DavidSiteEngagementAudit|Python-urllib|EngagementAudit/i;
var sources = /* @__PURE__ */ new Set(["direct", "projects_hub", "search", "social", "hypothesis", "other"]);
function sourceCategory(request) {
  const url = new URL(request.url);
  if (url.searchParams.get("utm_source") === "projects_hub") return "projects_hub";
  const ref = request.headers.get("referer");
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname;
    if (host === "projects.davidreinstein.org") return "projects_hub";
    if (/(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com)$/.test(host)) return "search";
    if (/(^|\.)(linkedin\.com|facebook\.com|t\.co|bsky\.app)$/.test(host)) return "social";
    if (host === "hyp.is" || host === "hypothes.is") return "hypothesis";
  } catch {
  }
  return "other";
}
async function increment(store, key, field) {
  for (let retry = 0; retry < 12; retry++) {
    const current = await store.getWithMetadata(key, { type: "json", consistency: "strong" });
    const data = current?.data || { counts: {} };
    data.counts[field] = (data.counts[field] || 0) + 1;
    const write = await store.setJSON(key, data, current?.etag ? { onlyIfMatch: current.etag } : { onlyIfNew: true });
    if (write.modified) return;
  }
  throw new Error("Counter contention limit");
}
function headers() {
  return { "Content-Type": "application/json", "Access-Control-Allow-Origin": DASHBOARD, "Cache-Control": "public, max-age=30", "X-Content-Type-Options": "nosniff" };
}
var engagement_default = async (request, context) => {
  const config2 = tracking_registry_default.sites.find((s) => s.site_id === context.site.id);
  if (!config2) return;
  const url = new URL(request.url);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const validation = url.searchParams.get("validation") === "1" || request.headers.get("x-engagement-qa") === "1";
  const prefix = validation ? "validation/" : "daily/";
  if (url.pathname === "/__engagement/summary") {
    if (request.method !== "GET") return new Response(null, { status: 405 });
    try {
      const store = getStore({ name: "anonymous-request-counts-v1", consistency: "strong" });
      const { blobs } = await store.list({ prefix });
      const cutoff = new Date(Date.now() - 29 * 864e5).toISOString().slice(0, 10);
      const keys = blobs.map((b) => b.key).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key.slice(prefix.length)) && key.slice(prefix.length) >= cutoff).sort().reverse().slice(0, 30);
      const days = (await Promise.all(keys.map(async (key) => {
        const record = await store.get(key, { type: "json" });
        return record ? { day: key.slice(prefix.length), counts: record.counts } : null;
      }))).filter(Boolean);
      return new Response(JSON.stringify({ site: config2.key, started_at: config2.started_at, unit: "requests, not unique visitors", validation, days }), { headers: headers() });
    } catch {
      return new Response(JSON.stringify({ site: config2.key, error: "Aggregate counts temporarily unavailable" }), { status: 503, headers: headers() });
    }
  }
  if (request.method !== "GET" || context.deploy.context !== "production") return;
  const route = config2.routes[url.pathname];
  if (!route) return;
  if (request.headers.get("sec-gpc") === "1" || request.headers.get("dnt") === "1") return;
  const ua = request.headers.get("user-agent") || "";
  if (AUDIT.test(ua) && !validation) return;
  const response = await context.next({ sendConditionalRequest: true });
  const content = response.headers.get("content-type") || "";
  if (![200, 201, 304].includes(response.status) || response.headers.get("x-robots-tag")?.includes("noindex")) return response;
  if (route.type === "html" && !content.includes("text/html") && response.status !== 304) return response;
  const source = sourceCategory(request);
  const agent = BOT.test(ua) ? "known_crawler" : "browserlike";
  const field = [route.label, route.type, sources.has(source) ? source : "other", agent].join("|");
  context.waitUntil((async () => {
    try {
      const store = getStore({ name: "anonymous-request-counts-v1", consistency: "strong" });
      await increment(store, prefix + today, field);
    } catch {
      console.warn("Aggregate counter unavailable");
    }
  })());
  return response;
};
var config = { path: "/*" };
export {
  config,
  engagement_default as default,
  increment
};
