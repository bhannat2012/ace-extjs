require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/87749d9714f1925e26afa48a0d592eaa39403858@/lib/ace/mode/python_highlight_rules'), ['pilot/oop','pilot/lang','ace/mode/text_highlight_rules'], function (require, exports, module) {


var oop = require("pilot/oop");
var lang = require("pilot/lang");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var PythonHighlightRules = function() {

    var keywords = lang.arrayToMap(
        ("and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield").split("|")
    );

    var builtinConstants = lang.arrayToMap(
        ("True|False|None|NotImplemented|Ellipsis|__debug__").split("|")
    );

    var builtinFunctions = lang.arrayToMap(
        ("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|set|apply|delattr|help|next|setattr|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern").split("|")
    );

    var futureReserved = lang.arrayToMap(
        ("").split("|")
    );

    var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "#.*$"
        }, {
            token : "string",           // """ string
            regex : strPre + '"{3}(?:[^\\\\]|\\\\.)*?"{3}'
        }, {
            token : "string",           // multi line """ string start
            regex : strPre + '"{3}.*$',
            next : "qqstring"
        }, {
            token : "string",           // " string
            regex : strPre + '"(?:[^\\\\]|\\\\.)*?"'
        }, {
            token : "string",           // ''' string
            regex : strPre + "'{3}(?:[^\\\\]|\\\\.)*?'{3}"
        }, {
            token : "string",           // multi line ''' string start
            regex : strPre + "'{3}.*$",
            next : "qstring"
        }, {
            token : "string",           // ' string
            regex : strPre + "'(?:[^\\\\]|\\\\.)*?'"
        }, {
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : function(value) {
                if (keywords.hasOwnProperty(value))
                    return "keyword";
                else if (builtinConstants.hasOwnProperty(value))
                    return "constant.language";
                else if (futureReserved.hasOwnProperty(value))
                    return "invalid.illegal";
                else if (builtinFunctions.hasOwnProperty(value))
                    return "support.function";
                else if (value == "debugger")
                    return "invalid.deprecated";
                else
                    return "identifier";
            },
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "qqstring" : [ {
            token : "string", // multi line """ string end
            regex : '(?:[^\\\\]|\\\\.)*?"{3}',
            next : "start"
        }, {
            token : "string",
            regex : '.+'
        } ],
        "qstring" : [ {
            token : "string",           // multi line ''' string end
            regex : "(?:[^\\\\]|\\\\.)*?'{3}",
            next : "start"
        }, {
            token : "string",
            regex : '.+'
        } ]
    };
};

oop.inherits(PythonHighlightRules, TextHighlightRules);

exports.PythonHighlightRules = PythonHighlightRules;
});
__bravojs_loaded_moduleIdentifier = bravojs.realpath(bravojs.mainModuleDir + '/87749d9714f1925e26afa48a0d592eaa39403858@/lib/ace/mode/python_highlight_rules');