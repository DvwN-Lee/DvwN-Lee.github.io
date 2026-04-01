// ========================================
// Config Data Module
// ========================================

export const config = {
    hero: {
        title: '안녕하세요,<br><span class="gradient-text">AI Agent Developer</span><br>이동주입니다',
        subtitle: 'LangGraph, MCP Protocol, RAG 기반 AI Agent를 설계하고 구현합니다.<br>LLM Serving Observability부터 토큰 효율 분석까지, Agent 개발 전 과정을 경험했습니다.'
    },
    about: {
        title: 'LangGraph, MCP Protocol, RAG 기반 AI Agent를 설계하고 구현하는 AI Agent Developer 이동주입니다.',
        paragraphs: [
            'FastAPI + Docker Compose로 Agent 서비스를 배포하고, Prometheus 기반 LLM 전용 메트릭을 설계하여 Observability를 확보한 경험이 있습니다.',
            'LangGraph StateGraph + MCP Protocol 기반 한국 금융 데이터 분석 AI Agent를 구현하고, Voyage AI 임베딩 + FAISS 벡터 검색으로 공시 문서 RAG를 수행했습니다.',
            'AI Agent 설계부터 LLM Serving, Observability, Backend 인프라까지 Agent 개발 전 과정을 경험하며, 실제 동작하는 Agent 시스템을 만드는 데 집중하고 있습니다.'
        ],
        highlights: ['LangGraph', 'MCP', 'RAG', 'LLM Ops']
    },
    email: 'dongju101101@gmail.com',
    socials: [
        {
            name: 'GitHub',
            url: 'https://github.com/DvwN-Lee',
            iconClass: 'fab fa-github',
            handle: 'github.com/DvwN-Lee'
        }
    ],
    contact: {
        email: 'dongju101101@gmail.com',
        github: 'github.com/DvwN-Lee',
        location: 'Anyang, Gyeonggi-do, Korea'
    },
    constants: {
        animations: {
            fadeIn: 300,
            fadeOut: 300,
            layoutSettle: 100,
            modalFallback: 400,
            imagesLoadedTimeout: 5000,
            sequentialInterval: 120,
            initialLoadDelay: 800,
            counterDuration: 2000,
            typeWriterWait: 3000,
            iconTransition: 100,
            feedbackReset: 2000,
            clickAnimation: 300,
        },
        navigation: {
            scrolledThreshold: 50,
            scrollTopThreshold: 300,
            sectionOffset: 100,
        },
        projects: {
            eagerLoadCount: 6,
            maxSequentialAnimation: 6,
        },
        typeWriterWords: ['AI Agent Developer', 'LLM Ops Engineer', 'Platform Engineer'],
    },
};
