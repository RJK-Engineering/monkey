
function getText(opts) {
    if (! opts.content)
        opts.content = function () {
            let n = document.querySelector('body');
            return n.innerHTML;
        };
    let s = opts.content();
    let re = opts.regex;
    let results = [];
    while ((result = re.exec(s)) !== null)
        results.push(result[0]);

    s = "";
    let unique = function (v, index, self) {
        return self.indexOf(v) === index;
    };
    results.filter(unique).forEach(function (v) {
        s += opts.textBefore + v + "\n";
    });
    return s;
}

console.log(getText({
    name: "youtube",
    regex: /watch\?v=[\w-]{11}/g,
    textBefore: "y https://www.youtube.com/"
}));

