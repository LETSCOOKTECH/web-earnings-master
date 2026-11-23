# 13 — Information retrieval and ranking: engineering reference

Date: 2026-11-23. This explains reproducible public algorithms, NOT a leaked proprietary Google/Bing implementation.

## What a general web search engine must solve
A large search system must discover URLs, crawl under host-level policies, parse documents, resolve duplicated URLs, index text and media, retrieve candidates for a query, order candidates, and generate results for many intents and devices. Each system can use other mechanisms and learned models. Different search engines may outsource or blend source indexes. Public specifications and observable outputs are stronger evidence than imagined rank formulas.

## URL frontier and deduplication
Collect URLs from sitemaps, anchors, submission routes and previously discovered pages. Normalize safely while preserving meaningful parameters, handle redirects, tracking/session URLs, host rate limits, robots-specific groups, crawl scheduling, retries, content change detection and recrawl. An infinite filter/calendar space can waste crawl effort. Discovery and crawling are independent from indexing; sitemap is a hint, not a rank or index contract.

## Document processing
HTTP bytes -> MIME/charset -> HTML parse -> optional render -> title, headings, body, links, language, structured data and media -> tokenization/normalization -> duplicate clustering -> canonical candidate -> index evaluation. Do not conflate declared rel=canonical with search-provider selected canonical. Rendering support varies; client-side JS content can be missed by some systems or blocked by resource access.

## Inverted indexes
A forward index maps document to features and terms. An inverted index maps term to document posting lists (IDs, frequency, positions). Example: d1 "compress image locally", d2 "image size calculator". posting(image) = {d1, d2}; posting(compress) = {d1}. AND intersects lists, OR unions; positions support phrase/proximity. Compression, sharding, segments, merges and replication make large-scale retrieval possible. They do not establish particular Google's internal technology.

## TF-IDF, BM25 and lexical ranking
TF-IDF weights within-document term evidence against corpus commonness. BM25 saturates frequency and normalizes length. Reference equation: sum over query terms of IDF(t) times [freq(t,D)*(k1+1)]/[freq(t,D)+k1*(1-b+b*len(D)/avgdl)]. k1 and b are tuning parameters for a reference implementation, not disclosed Google weights. A lexical ranker can miss synonyms such as "reduce JPG bytes" vs "compress photo"; building a toy corpus is instructive.

## Embeddings and approximate nearest neighbor search
Vector encoders map text/images into embeddings; similarity can retrieve related meanings beyond exact words. Approximate nearest neighbor methods may trade latency, memory and recall; HNSW and quantization are public design approaches. Semantic search can hallucinate relevance, miss rare exact tokens, mishandle negation and be sensitive to embedding model versions. Do not assume ChatGPT, Google, Bing and Perplexity use one embedding or partner index.

## Hybrid retrieval and multi-stage ranking
Combine lexical and vector candidates. Reciprocal Rank Fusion (RRF): score(d)=sum_i 1/(k+rank_i(d)); this is a reference technique, not universal vendor behavior. Other systems normalize and blend raw scores. Cheap first-stage retrieval can feed expensive reranking, with query-dependent filtering, freshness, locale, safety and diversity. OpenSearch and Vespa publish implementations of hybrid/phase ranking; do not say they prove Google deployed them.

## PageRank and graph signals
Represent websites as nodes and links as directed edges; a classical random surfer/damping algorithm estimates importance from the link graph. Modern spam/paid/nofollow link policies and canonicalization complicate link interpretation. Google publicly acknowledges PageRank evolved and remains within core ranking systems, but it does not disclose final weight or a public domain authority number. A high-PageRank irrelevant document can fail a task.

## Ranking evaluation
Define a query set and graded relevance labels. Precision@k, Recall@k, MRR and nDCG evaluate different aspects. A clean offline metric can miss user intent, freshness, current product functionality and zero-click SERP effects. Separate offline search quality from impressions, citations, actual human sessions and completed work.

## Hands-on tests
IR01 Create an original 100-document corpus and deterministic token/postings index.
IR02 Compare lexical BM25 versus synonym queries under fixed grading.
IR03 Add optional embedding retrieval, record model/version and cosine normalization.
IR04 Fuse result lists with RRF and explain changed rankings.
IR05 Simulate duplicate documents, preferred canonical and nonindexable document.
IR06 Compute PageRank on a toy 10-node graph and show why relevance still matters.
IR07 Simulate a SERP with top ads, AI answer and organic rank to show click opportunity differs from rank.
IR08 Repeat results by locale/device without claiming a stable position for all searchers.

## Confidence categories
Provider documented: a Google Search Central feature or policy. Open-source documented: Lucene/OpenSearch/Vespa implementation. Local reproduced: toy engine fixture. Search observed: dated SERP or own GSC/Bing account. Unknown: proprietary ranker weights, hidden feature sets, actual model training data, citation scorers.

## Primary/public technical sources
- Stanford information retrieval textbook (educational, not Google product): https://nlp.stanford.edu/IR-book/
- Apache Lucene BM25 implementation: https://lucene.apache.org/core/10_3_1/core/org/apache/lucene/search/similarities/BM25Similarity.html
- OpenSearch hybrid search: https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/
- OpenSearch RRF: https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/rrf/
- Vespa OSS: https://github.com/vespa-engine/vespa
- Google disclosed ranking systems: https://developers.google.com/search/docs/appearance/ranking-systems-guide
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a

At implementation time reopen provider docs and preserve sources and version dates. Never present an open-source formula as a secret Search-ranking exploit.
