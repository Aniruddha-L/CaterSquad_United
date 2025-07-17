# ELLZA MENTAL HEALTH CARE BOT - COMPLETE FLOW DIAGRAM

## 📊 PROJECT ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ELLZA MENTAL HEALTH CARE BOT                     │
│                              Technical Architecture                        │
└─────────────────────────────────────────────────────────────────────────────┘

```

## 🔄 COMPLETE SYSTEM FLOW

### PHASE 1: DATA INGESTION & VECTOR DATABASE CREATION
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PDF DOCUMENTS │    │   TEXT LOADING  │    │  TEXT CHUNKING  │    │ EMBEDDING GEN.  │
│                 │    │                 │    │                 │    │                 │
│ • Feeling Good  │───▶│ PyPDFLoader     │───▶│ RecursiveChar   │───▶│ SentenceTrans   │
│ • Anxiety Book  │    │ DirectoryLoader │    │ TextSplitter    │    │ all-MiniLM-L6   │
│ • Stress Book   │    │                 │    │ (500 chars)     │    │ (384 dim)       │
│ • Drive Book    │    │                 │    │ (50 overlap)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  FAISS INDEX    │◀───│  VECTOR STORE   │◀───│  DOCUMENT CHUNKS│
│                 │    │                 │    │                 │
│ • index.faiss   │    │ FAISS.from_docs │    │ • Chunk 1       │
│ • index.pkl     │    │                 │    │ • Chunk 2       │
│ (7.9MB + 2.8MB)│    │                 │    │ • Chunk N       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### PHASE 2: CHAT INTERFACE INITIALIZATION
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  CHAINLIT START │    │  MODEL LOADING  │    │  FAISS LOADING  │    │  SESSION SETUP  │
│                 │    │                 │    │                 │    │                 │
│ @cl.on_chat_start│───▶│ LLaMA-2-7B-GGML│───▶│ load_local()    │───▶│ user_session    │
│                 │    │ (Quantized)     │    │ (DB_FAISS_PATH) │    │ .set("chain")   │
│                 │    │ (4GB RAM)       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

### PHASE 3: USER QUERY PROCESSING (RAG PIPELINE)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  USER QUESTION  │    │  QUESTION EMB.  │    │  SIMILARITY     │    │  CONTEXT RET.   │
│                 │    │                 │    │  SEARCH         │    │                 │
│ "How to manage  │───▶│ SentenceTrans   │───▶│ FAISS Search    │───▶│ Most Relevant   │
│  anxiety?"      │    │ all-MiniLM-L6   │    │ (k=1)          │    │ Mental Health   │
│                 │    │ (384 dim vector)│    │                 │    │ Document Chunk  │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  PROMPT CONSTR. │    │  LLM GENERATION │    │  TOKEN STREAMING│    │  FINAL RESPONSE │
│                 │    │                 │    │                 │    │                 │
│ Context +       │───▶│ LLaMA-2-7B     │───▶│ Async Callback  │───▶│ Mental Health   │
│ Question        │    │ (temp=0.4)     │    │ on_new_token()  │    │ Advice +        │
│ Template        │    │ (max_tokens=1024)│   │                 │    │ Techniques      │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 TECHNICAL COMPONENTS DETAILED FLOW

### A. RAG (Retrieval-Augmented Generation) Pipeline
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RAG PIPELINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   QUERY     │───▶│  RETRIEVER  │───▶│   CONTEXT   │───▶│  GENERATOR  │ │
│  │             │    │             │    │             │    │             │ │
│  │ User Input  │    │ FAISS Search│    │ Mental Health│   │ LLaMA-2     │ │
│  │             │    │ (k=1)       │    │ Document    │   │ Model       │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
│         │                   │                   │                   │       │
│         ▼                   ▼                   ▼                   ▼       │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │ EMBEDDING   │    │ SIMILARITY  │    │ PROMPT TEMP.│    │ RESPONSE    │ │
│  │             │    │             │    │             │    │             │ │
│  │ SentenceTrans│   │ Cosine Dist.│    │ Custom      │    │ Mental Health│ │
│  │ Vector      │    │             │    │ Template    │    │ Advice       │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### B. Vector Database Creation Process
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        VECTOR DATABASE CREATION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   PDFs      │───▶│  TEXT EXTR. │───▶│  CHUNKING   │───▶│ EMBEDDINGS  │ │
│  │             │    │             │    │             │    │             │ │
│  │ 4 Mental    │    │ PyPDFLoader │    │ 500 chars   │    │ 384-dim     │ │
│  │ Health Docs │    │             │    │ 50 overlap  │    │ Vectors      │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
│         │                   │                   │                   │       │
│         ▼                   ▼                   ▼                   ▼       │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │ 18MB Total  │    │ Raw Text    │    │ N Chunks    │    │ FAISS Index │ │
│  │             │    │ Extraction  │    │             │    │             │ │
│  │ • Feeling   │    │             │    │ • Chunk 1   │    │ • index.faiss│ │
│  │   Good      │    │             │    │ • Chunk 2   │    │ • index.pkl  │ │
│  │ • Anxiety   │    │             │    │ • ...       │    │             │ │
│  │ • Stress    │    │             │    │ • Chunk N   │    │             │ │
│  │ • Drive     │    │             │    │             │    │             │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### C. Chat Interface Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CHAT INTERFACE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │ CHAINLIT    │───▶│  ASYNC      │───▶│  RAG CHAIN  │───▶│  STREAMING  │ │
│  │             │    │  HANDLER    │    │             │    │             │ │
│  │ Web UI      │    │ @cl.on_msg  │    │ qa_bot()   │    │ Token-by-   │ │
│  │             │    │             │    │             │    │ Token       │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
│         │                   │                   │                   │       │
│         ▼                   ▼                   ▼                   ▼       │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │ User Input  │    │ Session     │    │ RetrievalQA │    │ Real-time   │ │
│  │             │    │ Management  │    │ Chain       │    │ Response    │ │
│  │ Mental      │    │             │    │             │    │ Display     │ │
│  │ Health Q    │    │             │    │             │    │             │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🎯 KEY TECHNICAL FEATURES

### 1. Privacy & Security
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LOCAL EXECUTION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✅ No Data Leaves Machine    ✅ No API Dependencies    ✅ Offline Capable  │
│  ✅ CPU-Only Deployment       ✅ Quantized Models       ✅ Self-Contained   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. Performance Optimizations
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PERFORMANCE FEATURES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🚀 GGML Quantization        🚀 FAISS Fast Search      🚀 Async Streaming │
│  🚀 CPU Optimization          🚀 Memory Efficient       🚀 Real-time UI    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3. Scalability & Extensibility
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            SCALABILITY FEATURES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📈 Modular Architecture      📈 Easy Knowledge Base    📈 Configurable    │
│  📈 Add New PDFs             📈 Update Vectors         📈 Adjustable Params│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📋 INTERVIEW EXPLANATION POINTS

### 1. **RAG Implementation**
- "We implemented a two-stage RAG pipeline where document ingestion creates FAISS vectors, while the chat interface performs similarity search and context-aware generation"

### 2. **Local Deployment Strategy**
- "Privacy was paramount, so we chose CPU-only local deployment with quantized LLaMA-2, ensuring no data leaves the user's machine"

### 3. **Performance Optimization**
- "We optimized for memory efficiency using GGML quantization and FAISS for fast vector similarity search, enabling real-time responses on consumer hardware"

### 4. **Scalability Design**
- "The modular architecture allows easy knowledge base expansion - just add PDFs and run ingest.py to update the vector database"

### 5. **Technical Trade-offs**
- "We prioritized privacy and local execution over cloud scalability, choosing CPU deployment over GPU for broader accessibility"

## 🔍 TECHNICAL SPECIFICATIONS

### System Requirements
- **RAM**: 8GB minimum
- **Storage**: ~2GB for models and vectors
- **CPU**: Multi-core recommended
- **OS**: Cross-platform (Windows, Linux, macOS)

### Dependencies
- **AI/ML**: torch, transformers, accelerate, bitsandbytes, ctransformers
- **LangChain**: langchain, langchain_community, sentence_transformers
- **Vector DB**: faiss_cpu
- **Document Processing**: pypdf
- **Web Interface**: chainlit, huggingface_hub

### Model Specifications
- **LLM**: LLaMA-2-7B-Chat-GGML (quantized)
- **Embeddings**: all-MiniLM-L6-v2 (384 dimensions)
- **Vector DB**: FAISS with 7.9MB index + 2.8MB metadata
- **Knowledge Base**: 18MB of mental health literature

This flow diagram demonstrates expertise in **RAG systems**, **local AI deployment**, **vector databases**, **async web applications**, and **mental health AI applications** - all highly relevant for AI/ML engineering roles. 