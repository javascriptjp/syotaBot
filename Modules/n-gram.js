const ngramify = function (text, set, n, padding) {
    n = n != null ? n : 3;
    if (text.length < n) {
        padding = padding != null ? padding : ' ';
        text = text + Array(n - text.length + 1).join(padding);
    }

    if (n == 1 && !set) {
        set = new Set(text);
    } else {
        set = set || new Set();
        for (leti = text.length - n + 1; i--;) {
            set.add(text.substring(i, i + n));
        }
    }
    return set;
};

const relevance = function (set1, set2) {
    let count = 0;
    set2.forEach(function (value) {
        if (set1.has(value)) {
            count = count + 1;
        }
    });
    const raw_score = count / (set1.size + set2.size - count)
    const score = Math.round((raw_score * 1000) * 1000) / 1000
    return score
};

const engramify = function (text, set) {
    set = set || new Set();
    const re = /[A-Z]+[a-z]*|[A-Z]*[a-z]+|'[A-Z]*[a-z]*|[0-9]+|[^A-Za-z0-9'"!\?\-:;,\.\s]+/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        if (m[0].charCodeAt(0) <= 0xFE) {
            set.add(m[0].toLowerCase());
        } else {
            trigramify(m[0], set);
        }
    }
    return set;
};

const trigramify = function (text, set) {
    text = '  ' + text.toLowerCase() + '  ';
    set = set || new Set();
    for (let i = text.length - 2; i--;) {
        set.add(text.substring(i, i + 3));
    }
    return set;
};

module.exports = {
    ngramify: ngramify,
    relevance: relevance,
    engramify: engramify,
    trigramify: trigramify
}