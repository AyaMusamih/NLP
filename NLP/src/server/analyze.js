const meaningCloud = 'https://api.meaningcloud.com/sentiment-2.1';

const analyze = async (url, key) => {
    const endpoint = `${meaningCloud}?key=${key}&url=${url}&lang=EN`;

    return fetchData(endpoint)
        .then(processResponse)
        .catch(() => handleError(500, "Server error"));
};

const fetchData = async (endpoint) => {
    const response = await fetch(endpoint);
    return response.json();
};

const processResponse = (data) => {
    const { code, msg } = data.status;
    if (code === 100) return handleError(code, "Please, enter a valid url");
    if (code === 212) return handleError(code, msg);
    return handleSuccess(data, code);
};

const handleError = (code, msg) => ({ code, msg });

const handleSuccess = (data, code) => ({
    sample: extractSentimentData(data),
    code
});

const extractSentimentData = ({ agreement, subjectivity, confidence, score_tag, irony }) => ({
    agreement,
    subjectivity,
    confidence,
    score_tag,
    irony
});

module.exports = { analyze };
