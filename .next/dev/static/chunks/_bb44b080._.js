(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/RichTextEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RichTextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bold.js [app-client] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/italic.js [app-client] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heading.js [app-client] (ecmascript) <export default as Heading>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-ordered.js [app-client] (ecmascript) <export default as ListOrdered>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo.js [app-client] (ecmascript) <export default as Undo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/redo.js [app-client] (ecmascript) <export default as Redo>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function RichTextEditor({ value, onChange, placeholder = 'Write something...' }) {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder
            })
        ],
        content: value,
        onUpdate: {
            "RichTextEditor.useEditor[editor]": ({ editor })=>{
                onChange(editor.getHTML());
            }
        }["RichTextEditor.useEditor[editor]"],
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-4'
            }
        },
        immediatelyRender: false
    });
    if (!editor) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-slate-200 rounded-xl bg-slate-50 p-4 min-h-[150px]",
            children: "Loading editor..."
        }, void 0, false, {
            fileName: "[project]/components/RichTextEditor.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-slate-200 rounded-xl overflow-hidden bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-slate-200 p-2 flex flex-wrap gap-1 bg-slate-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().toggleBold().run(),
                        className: `p-1.5 rounded-md hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`,
                        title: "Bold",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().toggleItalic().run(),
                        className: `p-1.5 rounded-md hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`,
                        title: "Italic",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().toggleHeading({
                                level: 2
                            }).run(),
                        className: `p-1.5 rounded-md hover:bg-slate-200 transition-colors ${editor.isActive('heading', {
                            level: 2
                        }) ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`,
                        title: "Heading",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading$3e$__["Heading"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().toggleBulletList().run(),
                        className: `p-1.5 rounded-md hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`,
                        title: "Bullet List",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().toggleOrderedList().run(),
                        className: `p-1.5 rounded-md hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`,
                        title: "Ordered List",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__["ListOrdered"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-6 bg-slate-300 mx-1"
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().undo().run(),
                        className: "p-1.5 rounded-md hover:bg-slate-200 transition-colors text-slate-600",
                        title: "Undo",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__["Undo"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor.chain().focus().redo().run(),
                        className: "p-1.5 rounded-md hover:bg-slate-200 transition-colors text-slate-600",
                        title: "Redo",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo$3e$__["Redo"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/RichTextEditor.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RichTextEditor.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RichTextEditor.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                editor: editor,
                className: "bg-white"
            }, void 0, false, {
                fileName: "[project]/components/RichTextEditor.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RichTextEditor.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(RichTextEditor, "t0rsU/t1p+LiVrRpHUSgNnV9Lz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = RichTextEditor;
var _c;
__turbopack_context__.k.register(_c, "RichTextEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsAPI",
    ()=>productsAPI
]);
// lib/integration/products.ts - Product API integration
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const productsAPI = {
    // Create product
    async create (formData) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.ADD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async update (productId, formData) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.UPDATE}/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async get (productId) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.VIEW}/${productId}/false/true`);
    },
    async getAll (filters) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.LIST, filters);
    },
    async deleteColorGroup (type, productId, colorGroupId) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.DELETE_COLOR_GROUP}/${type}/${productId}/${colorGroupId}/null`);
    },
    async bulkUpdateStatus (productIds, status) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.BULK_UPDATE_STATUS, {
            productIds,
            status
        });
    },
    async bulkDelete (productIds) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].PRODUCT.BULK_DELETE, {
            productIds
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/common.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commonAPI",
    ()=>commonAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const commonAPI = {
    // Get all common
    async getAll () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON, {
            types: [
                "models",
                "colors",
                "materials",
                "sizes"
            ]
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categoriesAPI",
    ()=>categoriesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const categoriesAPI = {
    // Get all categories
    async getAll (lazyParams) {
        let search = "";
        if (lazyParams?.search) {
            search = `&search=${lazyParams.search}`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
    },
    // Get category by ID
    async getById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.GET}/${id}`);
    },
    // Create category
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.ADD}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Update category
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.UPDATE}/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Update category status only
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.UPDATE}/${id}`, {
            status
        });
    },
    // Delete category
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].CATEGORY.DELETE}/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/banners.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bannersAPI",
    ()=>bannersAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const bannersAPI = {
    async getAll (lazyParams) {
        let search = "";
        if (lazyParams?.search) {
            search = `&search=${encodeURIComponent(lazyParams.search)}`;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.LIST}?page=${lazyParams.page}&limit=${lazyParams.limit}${search}`);
    },
    async getById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.GET}/${id}`);
    },
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.ADD}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.UPDATE}/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.UPDATE}/${id}`, {
            status
        });
    },
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].BANNER.DELETE}/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/inventory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inventoryAPI",
    ()=>inventoryAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
;
;
const inventoryAPI = {
    // Get inventory list
    async getAll (params) {
        const url = `/${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].INVENTORY.LIST}?page=${params?.page || 1}&limit=${params?.limit || 10}&inventory_stock=${params?.inventory_stock || ''}&search=${params?.search || ''}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(url);
    },
    // Get inventory status
    async getInventoryStats () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].INVENTORY.STATS);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/reviews.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reviewsAPI",
    ()=>reviewsAPI
]);
// lib/integration/reviews.ts - Reviews API integration
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
;
const reviewsAPI = {
    // Get all reviews
    async getAll (params) {
        const url = `/admin/reviews?${new URLSearchParams(params || {}).toString()}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].get(url);
    },
    // Update review status
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].patch(`/admin/reviews/${id}/status`, {
            status
        });
    },
    // Update review
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].put(`/admin/reviews/${id}`, data);
    },
    // Delete review
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].delete(`/admin/reviews/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "colorsAPI",
    ()=>colorsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const colorsAPI = {
    // Get all colors
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'colors',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single color
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'colors',
            id
        });
    },
    // Create color
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'colors',
            data: {
                name: data.name,
                hex: data.hex
            }
        });
    },
    // Delete color
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'colors',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/models.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modelsAPI",
    ()=>modelsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const modelsAPI = {
    // Get all models
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'models',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single model
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'models',
            id
        });
    },
    // Create model
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'models',
            data: {
                name: data.name,
                username: data.username,
                password: data.password
            }
        });
    },
    // Update model
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'update',
            module: 'models',
            id,
            data
        });
    },
    // Create auth for model
    async createAuth (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].INFLUENCER.REGISTER, {
            name: data.name,
            email: `${data.username}@punroyal.com`,
            username: data.username,
            password: data.password || 'password123',
            role: 'influencer'
        });
    },
    // Delete model
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'models',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/sizes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sizesAPI",
    ()=>sizesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const sizesAPI = {
    // Get all sizes
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'sizes',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single size
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'sizes',
            id
        });
    },
    // Create size
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'sizes',
            data: {
                name: data.name
            }
        });
    },
    // Delete size
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'sizes',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/materials.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "materialsAPI",
    ()=>materialsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/endpoint.ts [app-client] (ecmascript)");
;
;
const materialsAPI = {
    // Get all materials
    async getAll (lazyParams) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'list',
            module: 'materials',
            data: {
                page: lazyParams.page,
                limit: lazyParams.limit
            }
        });
    },
    // Get single material
    async getOne (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'get',
            module: 'materials',
            id
        });
    },
    // Create material
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'create',
            module: 'materials',
            data: {
                name: data.name
            }
        });
    },
    // Delete material
    async delete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"].post(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$endpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENDPOINTS"].COMMON_HANDLER, {
            action: 'delete',
            module: 'materials',
            id
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/integration/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// lib/integration/index.ts - Export all API integrations
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/common.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$banners$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/banners.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$inventory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/inventory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$reviews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/reviews.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/colors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/models.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$sizes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/sizes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/materials.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/select/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AsyncSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$react$2d$select$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-select/dist/react-select.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// ✅ debounce
function debounce(fn, delay) {
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>fn(...args), delay);
    };
}
function AsyncSelect({ className, value, onChange, placeholder = "Select", fetchOptions, mapOption, limit = 10 }) {
    _s();
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🔍 Load options
    const loadOptions = async (inputValue = "", pageNo = 1)=>{
        try {
            setLoading(true);
            const res = await fetchOptions({
                page: pageNo,
                limit,
                search: inputValue
            });
            const newOptions = res?.data?.map((item)=>mapOption(item)) || [];
            if (pageNo === 1) {
                setOptions(newOptions);
            } else {
                setOptions((prev)=>[
                        ...prev,
                        ...newOptions
                    ]);
            }
            setHasMore(newOptions.length === limit);
        } catch (err) {
            console.error("Dropdown fetch error", err);
        } finally{
            setLoading(false);
        }
    };
    // 🔍 debounce search
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AsyncSelect.useMemo[handleInputChange]": ()=>debounce({
                "AsyncSelect.useMemo[handleInputChange]": (value)=>{
                    setSearch(value);
                    setPage(1);
                    loadOptions(value, 1);
                }
            }["AsyncSelect.useMemo[handleInputChange]"], 400)
    }["AsyncSelect.useMemo[handleInputChange]"], []);
    // 📜 infinite scroll
    const handleScroll = ()=>{
        if (!hasMore || loading) return;
        setPage((prev)=>{
            const nextPage = prev + 1;
            loadOptions(search, nextPage);
            return nextPage;
        });
    };
    // ✅ initial load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AsyncSelect.useEffect": ()=>{
            loadOptions("", 1);
        }
    }["AsyncSelect.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$react$2d$select$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
        className: className,
        options: options,
        placeholder: placeholder,
        value: options.find((opt)=>opt.value === value) || null,
        isLoading: loading,
        onInputChange: (val)=>{
            handleInputChange(val);
            return val;
        },
        onMenuScrollToBottom: handleScroll,
        onChange: (selected)=>onChange(selected?.value),
        menuPortalTarget: ("TURBOPACK compile-time truthy", 1) ? document.body : "TURBOPACK unreachable",
        styles: {
            menuPortal: (base)=>({
                    ...base,
                    zIndex: 9999
                })
        },
        noOptionsMessage: ()=>loading ? "Loading..." : "No results found"
    }, void 0, false, {
        fileName: "[project]/components/admin/select/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(AsyncSelect, "xtAnlYuam6Xq8G0T8Bva0bQgpyo=");
_c = AsyncSelect;
var _c;
__turbopack_context__.k.register(_c, "AsyncSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/helpers/handlers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getErrorMessage",
    ()=>getErrorMessage
]);
const getErrorMessage = (error)=>{
    const err = error;
    return err.response?.data?.error || err.message || "An error occurred";
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/sweetAlert.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "confirmDelete",
    ()=>confirmDelete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
;
const confirmDelete = async (title = "Are you sure?")=>{
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
        title,
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
            timer: 1200,
            showConfirmButton: false
        });
    }
    return result.isConfirmed;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/product/EditColorVariantsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColorVariantsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-client] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/helpers/handlers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sweetAlert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sweetAlert.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/integration/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ColorVariantsSection({ loading, colors, sizes, onChange, product_type, onValidationChange, productImages = [], variants: apiVariants = [], media: apiMedia = [], productId }) {
    _s();
    const [colorGroups, setColorGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [primaryColorId, setPrimaryColorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const initialised = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // ── Seed from API data ──────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ColorVariantsSection.useEffect": ()=>{
            if (initialised.current) return;
            if (!productImages.length && !apiVariants.length) return;
            if (!colors.length) return;
            initialised.current = true;
            const imagesByColor = {};
            productImages.forEach({
                "ColorVariantsSection.useEffect": (img)=>{
                    if (!imagesByColor[img.color_id]) imagesByColor[img.color_id] = [];
                    imagesByColor[img.color_id].push(img);
                }
            }["ColorVariantsSection.useEffect"]);
            const sizesByColor = {};
            apiVariants.forEach({
                "ColorVariantsSection.useEffect": (v)=>{
                    const cid = v.color._id;
                    if (!sizesByColor[cid]) sizesByColor[cid] = [];
                    sizesByColor[cid].push({
                        size_id: v.size._id,
                        stock: v.stock
                    });
                }
            }["ColorVariantsSection.useEffect"]);
            const colorIds = Array.from(new Set([
                ...Object.keys(imagesByColor),
                ...Object.keys(sizesByColor)
            ]));
            if (!colorIds.length) return;
            const groups = colorIds.map({
                "ColorVariantsSection.useEffect.groups": (colorId, idx)=>{
                    const imgs = (imagesByColor[colorId] || []).sort({
                        "ColorVariantsSection.useEffect.groups.imgs": (a, b)=>a.sortOrder - b.sortOrder
                    }["ColorVariantsSection.useEffect.groups.imgs"]);
                    const media_gallery = imgs.map({
                        "ColorVariantsSection.useEffect.groups.media_gallery": (img)=>({
                                preview: img.url,
                                role: img.role,
                                is_primary: img.isPrimary ? 1 : 0,
                                sort_order: img.sortOrder,
                                existing_id: img._id,
                                isExisting: true,
                                isReplaced: false,
                                isDeleted: false
                            })
                    }["ColorVariantsSection.useEffect.groups.media_gallery"]);
                    const sz = sizesByColor[colorId] || [];
                    const builtSizes = sz.length > 0 ? sz.map({
                        "ColorVariantsSection.useEffect.groups": (s, i)=>({
                                id: Date.now() + idx * 1000 + i,
                                size_id: s.size_id,
                                stock: s.stock,
                                sku: ""
                            })
                    }["ColorVariantsSection.useEffect.groups"]) : [
                        {
                            id: Date.now() + idx * 1000,
                            size_id: "",
                            stock: 0,
                            sku: ""
                        }
                    ];
                    return {
                        id: Date.now() + idx,
                        color_id: colorId,
                        media_gallery,
                        sizes: builtSizes
                    };
                }
            }["ColorVariantsSection.useEffect.groups"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                "ColorVariantsSection.useEffect": ()=>{
                    setColorGroups(groups);
                    const primaryMedia = apiMedia.find({
                        "ColorVariantsSection.useEffect.primaryMedia": (m)=>m.isPrimary
                    }["ColorVariantsSection.useEffect.primaryMedia"]);
                    if (primaryMedia) {
                        setPrimaryColorId(primaryMedia.color_id);
                    } else if (groups.length) {
                        setPrimaryColorId(groups[0].color_id);
                    }
                }
            }["ColorVariantsSection.useEffect"]);
        }
    }["ColorVariantsSection.useEffect"], [
        productImages,
        apiVariants,
        apiMedia,
        colors
    ]);
    // ── Payload builder ────────────────────────────────────────────────────────
    /**
   * Rules:
   * 1. DELETED existing image   → exclude entirely (don't send to server)
   * 2. REPLACED existing image  → send file binary + file_id (existing _id) + file_ref
   * 3. NEW image (no existing)  → send file binary + file_id="" + file_ref
   * 4. UNTOUCHED existing image → send file_id only (no file, no file_ref)
   */ const getImagesPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorVariantsSection.useCallback[getImagesPayload]": ()=>{
            return colorGroups.map({
                "ColorVariantsSection.useCallback[getImagesPayload]": (group)=>({
                        color_id: group.color_id,
                        files: group.media_gallery// ── Exclude soft-deleted existing images ──
                        .filter({
                            "ColorVariantsSection.useCallback[getImagesPayload]": (m)=>!m.isDeleted
                        }["ColorVariantsSection.useCallback[getImagesPayload]"]).map({
                            "ColorVariantsSection.useCallback[getImagesPayload]": (m)=>({
                                    ...m.file ? {
                                        file: m.file
                                    } : {},
                                    file_id: m.existing_id ?? null,
                                    ...m.file ? {
                                        file_ref: `file_ref_${m.role}`
                                    } : {},
                                    role: m.role,
                                    is_primary: m.is_primary,
                                    sort_order: m.sort_order
                                })
                        }["ColorVariantsSection.useCallback[getImagesPayload]"])
                    })
            }["ColorVariantsSection.useCallback[getImagesPayload]"]);
        }
    }["ColorVariantsSection.useCallback[getImagesPayload]"], [
        colorGroups
    ]);
    const getVariantsPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorVariantsSection.useCallback[getVariantsPayload]": ()=>{
            const variants = [];
            colorGroups.forEach({
                "ColorVariantsSection.useCallback[getVariantsPayload]": (group)=>{
                    group.sizes.forEach({
                        "ColorVariantsSection.useCallback[getVariantsPayload]": (size)=>{
                            if (size.size_id) {
                                variants.push({
                                    color_id: group.color_id,
                                    size_id: size.size_id,
                                    quantity: size.stock
                                });
                            }
                        }
                    }["ColorVariantsSection.useCallback[getVariantsPayload]"]);
                }
            }["ColorVariantsSection.useCallback[getVariantsPayload]"]);
            return variants;
        }
    }["ColorVariantsSection.useCallback[getVariantsPayload]"], [
        colorGroups
    ]);
    // ── Validation ─────────────────────────────────────────────────────────────
    const validateGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorVariantsSection.useCallback[validateGroups]": ()=>{
            const newErrors = {};
            let isValid = true;
            colorGroups.forEach({
                "ColorVariantsSection.useCallback[validateGroups]": (group, gIdx)=>{
                    const err = {};
                    if (!group.color_id) {
                        err.color_id = "Please select a color";
                        isValid = false;
                    }
                    // Count only non-deleted items
                    const visibleImages = group.media_gallery.filter({
                        "ColorVariantsSection.useCallback[validateGroups].visibleImages": (m)=>!m.isDeleted
                    }["ColorVariantsSection.useCallback[validateGroups].visibleImages"]);
                    if (visibleImages.length < 1) {
                        err.images = "At least 1 image is required";
                        isValid = false;
                    }
                    if (product_type === "sizes") {
                        const hasInvalidSize = group.sizes.some({
                            "ColorVariantsSection.useCallback[validateGroups].hasInvalidSize": (s)=>!s.size_id || s.stock < 0
                        }["ColorVariantsSection.useCallback[validateGroups].hasInvalidSize"]);
                        if (hasInvalidSize) {
                            err.sizes = "Each size must be selected with valid stock quantity (0 or more)";
                            isValid = false;
                        }
                    }
                    if (Object.keys(err).length > 0) newErrors[gIdx] = err;
                }
            }["ColorVariantsSection.useCallback[validateGroups]"]);
            return {
                isValid,
                errors: newErrors
            };
        }
    }["ColorVariantsSection.useCallback[validateGroups]"], [
        colorGroups,
        product_type
    ]);
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ColorVariantsSection.useMemo[validation]": ()=>validateGroups()
    }["ColorVariantsSection.useMemo[validation]"], [
        validateGroups
    ]);
    const groupErrors = validation.errors;
    const isValid = validation.isValid;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ColorVariantsSection.useEffect": ()=>{
            onValidationChange?.(isValid);
            onChange({
                primaryColorId: primaryColorId ? String(primaryColorId) : null,
                images: getImagesPayload(),
                variants: getVariantsPayload()
            });
        }
    }["ColorVariantsSection.useEffect"], [
        colorGroups,
        primaryColorId,
        isValid
    ]);
    // ── Add / Remove Color Group ───────────────────────────────────────────────
    const addColorVariant = ()=>{
        if (colorGroups.length >= colors.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("No more colors available to add");
            return;
        }
        const id = Date.now();
        setColorGroups((prev)=>[
                ...prev,
                {
                    id,
                    color_id: "",
                    media_gallery: [],
                    sizes: [
                        {
                            id: id + 1,
                            size_id: "",
                            stock: 0,
                            sku: ""
                        }
                    ]
                }
            ]);
    };
    const removeColorVariant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorVariantsSection.useCallback[removeColorVariant]": async (id, color_id)=>{
            try {
                if (colorGroups?.length > 1) {
                    const isConfirmed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sweetAlert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirmDelete"])("Delete this color group?");
                    if (!isConfirmed) return;
                    if (productId) {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productsAPI"].deleteColorGroup("REMOVE_COLOR_GROUP", productId, color_id);
                        if (response?.code === "OK") {
                            const updated = colorGroups.filter({
                                "ColorVariantsSection.useCallback[removeColorVariant].updated": (g)=>g.id !== Number(id)
                            }["ColorVariantsSection.useCallback[removeColorVariant].updated"]);
                            setColorGroups(updated);
                            if (primaryColorId === colorGroups.find({
                                "ColorVariantsSection.useCallback[removeColorVariant]": (g)=>g.id === Number(id)
                            }["ColorVariantsSection.useCallback[removeColorVariant]"])?.color_id) {
                                setPrimaryColorId(updated.length ? updated[0].color_id : null);
                            }
                        }
                    } else {
                        const updated = colorGroups.filter({
                            "ColorVariantsSection.useCallback[removeColorVariant].updated": (g)=>g.id !== Number(id)
                        }["ColorVariantsSection.useCallback[removeColorVariant].updated"]);
                        setColorGroups(updated);
                        if (primaryColorId === colorGroups.find({
                            "ColorVariantsSection.useCallback[removeColorVariant]": (g)=>g.id === Number(id)
                        }["ColorVariantsSection.useCallback[removeColorVariant]"])?.color_id) {
                            setPrimaryColorId(updated.length ? updated[0].color_id : null);
                        }
                    }
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Cannot remove the last color group.");
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorMessage"])(error));
            }
        }
    }["ColorVariantsSection.useCallback[removeColorVariant]"], [
        productId,
        colorGroups,
        primaryColorId
    ]);
    // const removeColorVariant = (id: number, color_id: string) => {
    //   console.log("Removing color group with id:", color_id);
    //   const updated = colorGroups.filter((g) => g.id !== id);
    //   setColorGroups(updated);
    //   if (primaryColorId === colorGroups.find((g) => g.id === id)?.color_id) {
    //     setPrimaryColorId(updated.length ? updated[0].color_id : null);
    //   }
    // };
    // ── Sizes ──────────────────────────────────────────────────────────────────
    const addSizeToGroup = (gIdx)=>{
        const currentSizes = colorGroups[gIdx].sizes;
        if (currentSizes.length >= sizes.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("No more sizes available to add for this color");
            return;
        }
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].sizes.push({
            id: Date.now(),
            size_id: "",
            stock: 0,
            sku: ""
        });
        setColorGroups(updated);
    };
    const updateSizeField = (gIdx, sIdx, field, value)=>{
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].sizes[sIdx][field] = value;
        setColorGroups(updated);
    };
    const handleStockChange = (gIdx, sIdx, value)=>{
        if (/^\d*$/.test(value)) {
            const num = Number(value);
            const clamped = value === "" ? 0 : Math.max(num, 0);
            updateSizeField(gIdx, sIdx, "stock", clamped);
        }
    };
    const removeSize = (gIdx, sIdx)=>{
        const updated = [
            ...colorGroups
        ];
        updated[gIdx].sizes.splice(sIdx, 1);
        setColorGroups(updated);
    };
    // ── Image helpers ──────────────────────────────────────────────────────────
    const compressImage = (file)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event)=>{
                const img = new window.Image();
                img.src = event.target?.result;
                img.onload = ()=>{
                    const canvas = document.createElement("canvas");
                    let { width, height } = img;
                    const maxDimension = 1200;
                    if (width > maxDimension || height > maxDimension) {
                        if (width > height) {
                            height = height * maxDimension / width;
                            width = maxDimension;
                        } else {
                            width = width * maxDimension / height;
                            height = maxDimension;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return reject(new Error("Could not get canvas context"));
                    ctx.drawImage(img, 0, 0, width, height);
                    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
                    const outputExt = file.type === "image/png" ? ".png" : ".jpg";
                    const baseName = file.name.replace(/\.[^/.]+$/, "");
                    canvas.toBlob((blob)=>{
                        if (!blob) return reject(new Error("Canvas toBlob failed"));
                        resolve(new File([
                            blob
                        ], `${baseName}${outputExt}`, {
                            type: outputType,
                            lastModified: Date.now()
                        }));
                    }, outputType, 0.8);
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    };
    /**
   * REPLACE: keeps existing_id, sets isReplaced=true, updates file + preview.
   * NEW UPLOAD: pushes a fresh MediaItem with no existing_id.
   */ const handleImageUpload = async (gIdx, role, files)=>{
        if (!files?.length) return;
        const file = files[0];
        if (file.size > 5 * 1024 * 1024) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("File size should not exceed 5MB");
            return;
        }
        let finalFile = file;
        if (file.size > 500 * 1024) {
            finalFile = await compressImage(file);
        }
        // Create preview BEFORE setState so it's ready immediately
        const preview = URL.createObjectURL(finalFile);
        setColorGroups((prev)=>{
            const updated = prev.map((g, i)=>{
                if (i !== gIdx) return g;
                const gallery = [
                    ...g.media_gallery
                ];
                const index = gallery.findIndex((m)=>m.role === role);
                if (index !== -1) {
                    // ── REPLACE existing or previously-uploaded slot ──
                    // Revoke old blob URL to free memory
                    if (gallery[index].preview?.startsWith("blob:")) {
                        URL.revokeObjectURL(gallery[index].preview);
                    }
                    gallery[index] = {
                        ...gallery[index],
                        file: finalFile,
                        preview,
                        isReplaced: true,
                        isDeleted: false
                    };
                } else {
                    // ── Brand-new slot ──
                    gallery.push({
                        file: finalFile,
                        preview,
                        role,
                        is_primary: gallery.filter((m)=>!m.isDeleted).length === 0 || role === "Front" ? 1 : 0,
                        sort_order: gallery.filter((m)=>!m.isDeleted).length + 1,
                        existing_id: undefined,
                        isExisting: false,
                        isReplaced: false,
                        isDeleted: false
                    });
                }
                return {
                    ...g,
                    media_gallery: gallery
                };
            });
            return updated;
        });
    };
    const setAsPrimaryImage = (gIdx, idx)=>{
        setColorGroups((prev)=>prev.map((g, i)=>{
                if (i !== gIdx) return g;
                return {
                    ...g,
                    media_gallery: g.media_gallery.map((m, mi)=>({
                            ...m,
                            is_primary: mi === idx ? 1 : 0
                        }))
                };
            }));
    };
    /**
   * DELETE:
   * - Existing image (from DB) → soft-delete (isDeleted=true), hidden from UI,
   *   excluded from payload so server knows to remove it.
   * - New image (never saved) → hard remove from array + revoke blob URL.
   */ // New fucntion
    // const removeImage = useCallback(async (gIdx: number, idx: number, _id: string | undefined) => {
    //   try {
    //     const response = await productsAPI.deleteColorGroup('REMOVE_COLOR_GROUP', productId, _id);
    //     const isConfirmed = await confirmDelete("Delete this image?");
    //     if (!isConfirmed) return;
    //     if (response?.code === "OK") {
    //       setColorGroups((prev) =>
    //         prev.map((g, i) => {
    //           if (i !== gIdx) return g;
    //           const gallery = [...g.media_gallery];
    //           const media = gallery[idx];
    //           if (media.isExisting) {
    //             gallery[idx] = { ...media, isDeleted: true };
    //           } else {
    //             // Hard-delete: revoke blob URL and splice out
    //             if (media.preview?.startsWith("blob:")) {
    //               URL.revokeObjectURL(media.preview);
    //             }
    //             gallery.splice(idx, 1);
    //           }
    //           return { ...g, media_gallery: gallery };
    //         }),
    //       );
    //     }
    //   } catch (error) {
    //     toast.error(getErrorMessage(error));
    //   }
    // }, [productId]);
    const removeImage = (gIdx, idx, _id)=>{
        console.log("Removing image with id:", _id);
        setColorGroups((prev)=>prev.map((g, i)=>{
                if (i !== gIdx) return g;
                const gallery = [
                    ...g.media_gallery
                ];
                const media = gallery[idx];
                if (media.isExisting) {
                    gallery[idx] = {
                        ...media,
                        isDeleted: true
                    };
                } else {
                    if (media.preview?.startsWith("blob:")) {
                        URL.revokeObjectURL(media.preview);
                    }
                    gallery.splice(idx, 1);
                }
                return {
                    ...g,
                    media_gallery: gallery
                };
            }));
    };
    // ─── Render ────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-indigo-600 p-3 rounded-2xl text-white shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                    lineNumber: 602,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                lineNumber: 601,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl md:text-3xl font-black text-slate-800",
                                        children: "Update Product"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                        lineNumber: 605,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm",
                                        children: "Manage color variants, images & stock"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                        lineNumber: 608,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: loading,
                        onClick: addColorVariant,
                        className: "w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this),
                            " Add Color Variant"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                lineNumber: 599,
                columnNumber: 7
            }, this),
            colorGroups.map((group, gIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `bg-white rounded-3xl shadow-sm border-2 transition-all overflow-hidden ${primaryColorId === group.color_id ? "border-indigo-600 shadow-xl scale-[1.01]" : "border-slate-200"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-900 p-4 md:p-6 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            disabled: loading,
                                            value: group.color_id,
                                            onChange: (e)=>{
                                                const updated = [
                                                    ...colorGroups
                                                ];
                                                updated[gIdx].color_id = e.target.value;
                                                setColorGroups(updated);
                                            },
                                            className: "bg-slate-800 text-white px-5 py-2.5 rounded-xl",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Color"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 17
                                                }, this),
                                                colors.filter((c)=>!colorGroups.some((g, i)=>i !== gIdx && g.color_id === c.id)).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: c.id,
                                                        children: c.name
                                                    }, c.id, false, {
                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                        lineNumber: 654,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, this),
                                        group.color_id && (()=>{
                                            const color = colors.find((c)=>c.id === group.color_id);
                                            return color?.hex ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                title: color.name,
                                                className: "inline-block w-6 h-6 rounded-full border-2 border-white shadow",
                                                style: {
                                                    backgroundColor: color.hex
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                lineNumber: 663,
                                                columnNumber: 21
                                            }, this) : null;
                                        })(),
                                        groupErrors[gIdx]?.color_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 text-xs ml-2",
                                            children: groupErrors[gIdx].color_id
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 671,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: !group.color_id,
                                            onClick: ()=>setPrimaryColorId(group.color_id),
                                            className: `px-4 py-2 rounded-xl text-xs font-bold ${primaryColorId === group.color_id ? "bg-green-600 text-white" : "bg-indigo-600 text-white"}`,
                                            children: "Default"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 675,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                    lineNumber: 634,
                                    columnNumber: 13
                                }, this),
                                !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeColorVariant(String(group.id), group.color_id),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                        lineNumber: 691,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                    lineNumber: 688,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                            lineNumber: 633,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-black uppercase text-slate-400 mb-4 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 17
                                                }, this),
                                                " Product Images"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 700,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
                                            children: [
                                                "Front",
                                                "Back",
                                                "Side",
                                                "Detail"
                                            ].map((role)=>{
                                                // Find the slot for this role, skipping soft-deleted ones
                                                const mediaIndex = group.media_gallery.findIndex((m)=>m.role === role && !m.isDeleted);
                                                const media = mediaIndex !== -1 ? group.media_gallery[mediaIndex] : null;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative aspect-square rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-slate-50",
                                                            children: media ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: media.preview,
                                                                        alt: `${role} image`,
                                                                        className: "w-full h-full object-cover rounded-xl"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "absolute top-1 left-1 bg-slate-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center",
                                                                        children: media.sort_order
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 725,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setAsPrimaryImage(gIdx, mediaIndex),
                                                                        className: "absolute bottom-1 left-1 bg-yellow-400 p-1 rounded-full",
                                                                        title: "Set as primary",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                            size: 12,
                                                                            fill: media.is_primary ? "white" : "none",
                                                                            stroke: media.is_primary ? "gold" : "white"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                            lineNumber: 737,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 730,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "absolute top-1 right-1 bg-blue-500 p-1 rounded-full text-white cursor-pointer",
                                                                        title: media.isReplaced ? "Replace again" : "Replace image",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                                size: 12
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                                lineNumber: 757,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "file",
                                                                                disabled: loading,
                                                                                className: "hidden",
                                                                                accept: "image/png, image/jpeg, image/jpg",
                                                                                onChange: (e)=>e.target.files && handleImageUpload(gIdx, role, e.target.files)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                                lineNumber: 758,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 749,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeImage(gIdx, mediaIndex, media.existing_id),
                                                                        className: "absolute bottom-1 right-1 bg-red-500 p-1 rounded-full text-white",
                                                                        title: "Delete image",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                            lineNumber: 787,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 776,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : /* Empty slot → Upload */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col items-center gap-1 pointer-events-none",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {
                                                                                className: "text-slate-400",
                                                                                size: 20
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                                lineNumber: 795,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[9px] text-slate-400",
                                                                                children: "Upload"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                                lineNumber: 799,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 794,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        disabled: loading,
                                                                        className: "absolute inset-0 opacity-0 cursor-pointer",
                                                                        onChange: (e)=>e.target.files && handleImageUpload(gIdx, role, e.target.files),
                                                                        accept: "image/png, image/jpeg, image/jpg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 803,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[9px] text-center mt-1 uppercase text-slate-500",
                                                            children: role
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                            lineNumber: 816,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, role, true, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 703,
                                            columnNumber: 15
                                        }, this),
                                        groupErrors[gIdx]?.images && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs mt-2 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 825,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                groupErrors[gIdx].images
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 824,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                    lineNumber: 699,
                                    columnNumber: 13
                                }, this),
                                product_type === "sizes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-xs font-black text-slate-600 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Sizes & Stock"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 834,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addSizeToGroup(gIdx),
                                                    className: "text-[10px] bg-white px-3 py-1.5 rounded-xl border font-bold text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-sm",
                                                    children: "+ Add Size"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 837,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 833,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-slate-400 mb-3",
                                            children: "SKU auto-generates when Brand, Category Code, Product Code, Color, and Size are selected"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 844,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 max-h-96 overflow-y-auto pr-1",
                                            children: [
                                                group.sizes.map((size, sIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col sm:flex-row gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        disabled: loading,
                                                                        value: size.size_id,
                                                                        onChange: (e)=>updateSizeField(gIdx, sIdx, "size_id", e.target.value),
                                                                        className: "flex-1 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                children: "Select Size"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                                lineNumber: 868,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            sizes.filter((sz)=>!group.sizes.some((s, i)=>i !== sIdx && s.size_id === sz.id)).map((sz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: sz.id,
                                                                                    children: sz.name
                                                                                }, sz.id, false, {
                                                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                                    lineNumber: 877,
                                                                                    columnNumber: 31
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 855,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        placeholder: "Stock",
                                                                        value: size.stock || "",
                                                                        readOnly: loading,
                                                                        onChange: (e)=>handleStockChange(gIdx, sIdx, e.target.value),
                                                                        className: "w-full sm:w-24 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 882,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeSize(gIdx, sIdx),
                                                                        className: "text-slate-400 hover:text-red-500 p-2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                            lineNumber: 899,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                        lineNumber: 895,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                lineNumber: 854,
                                                                columnNumber: 23
                                                            }, this),
                                                            size.sku && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 p-2 bg-indigo-50 rounded-lg border border-indigo-100",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] font-mono text-indigo-700 font-bold break-all",
                                                                    children: [
                                                                        "🔑 SKU: ",
                                                                        size.sku
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                    lineNumber: 905,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                                lineNumber: 904,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, size.id, true, {
                                                        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                        lineNumber: 850,
                                                        columnNumber: 21
                                                    }, this)),
                                                groupErrors[gIdx]?.sizes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-500 text-xs mt-2 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                            lineNumber: 914,
                                                            columnNumber: 23
                                                        }, this),
                                                        " ",
                                                        groupErrors[gIdx].sizes
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                                    lineNumber: 913,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                            lineNumber: 848,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                                    lineNumber: 832,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                            lineNumber: 697,
                            columnNumber: 11
                        }, this)
                    ]
                }, group.id, true, {
                    fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
                    lineNumber: 624,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/product/EditColorVariantsSection.tsx",
        lineNumber: 597,
        columnNumber: 5
    }, this);
}
_s(ColorVariantsSection, "s1ZV45/ga+l3mQmuxkL8h5BkggY=");
_c = ColorVariantsSection;
var _c;
__turbopack_context__.k.register(_c, "ColorVariantsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/validations/product.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productValidate",
    ()=>productValidate
]);
const productValidate = (form, setErrors)=>{
    const newErrors = {};
    // -------- BASIC --------
    if (!form.title.trim()) {
        newErrors.title = "Product title is required";
    }
    if (!form.product_type) {
        newErrors.product_type = "Product type is required";
    }
    if (!form.price || form.price <= 0) {
        newErrors.price = "Price must be greater than 0";
    }
    if (!form.display_price || form.display_price <= 0) {
        newErrors.display_price = "Display price must be greater than 0";
    }
    if (!form.cat_id) {
        newErrors.cat_id = "Category is required";
    }
    if (!form.description.trim()) {
        newErrors.description = "Description is required";
    }
    if (!form.specifications.trim()) {
        newErrors.specifications = "Specifications are required";
    }
    if (form.video_link && !form.video_link.startsWith("http")) {
        newErrors.video_link = "Video link must be a valid URL";
    }
    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/products/edit/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RichTextEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RichTextEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/integration/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/integration/common.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$select$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/select/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$product$2f$EditColorVariantsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/product/EditColorVariantsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/helpers/handlers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$validations$2f$product$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/validations/product.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function CreateProductPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params?.id;
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [colorVariantsValid, setColorVariantsValid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [redirectTo, setRedirectTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [productImages, setProductImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [common, setCommon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        models: [],
        materials: [],
        sizes: [],
        colors: []
    });
    const [variantData, setVariantData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        primaryColorId: null,
        images: [],
        variants: []
    });
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        display_price: 0,
        price: 0,
        quantity: 0,
        product_type: "sizes",
        description: "",
        specifications: "",
        cat_id: "",
        status: true,
        video: [],
        video_link: "",
        primaryColorId: null,
        isPrimary: false,
        model_id: "",
        commission: 0,
        commission_type: "percentage",
        weight: 0,
        height: 0,
        breadth: 0,
        length: 0,
        metarial: [],
        variants: [],
        media: []
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const fetchProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CreateProductPage.useCallback[fetchProduct]": async (id)=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productsAPI"].get(id);
                console.log("Fetch Product Response:", response);
                if (response?.code === "OK") {
                    const product = response?.data?.product;
                    const productImagesData = response?.data?.productImages || [];
                    setProductImages(productImagesData);
                    // ✅ FIX: Transform media for ColorVariantsSection
                    const transformedMedia = productImagesData.map({
                        "CreateProductPage.useCallback[fetchProduct].transformedMedia": (img)=>({
                                _id: img._id,
                                url: img.url,
                                color_id: img.color_id,
                                isPrimary: img.isPrimary,
                                color_name: ""
                            })
                    }["CreateProductPage.useCallback[fetchProduct].transformedMedia"]);
                    setForm({
                        title: product?.title || "",
                        display_price: product?.display_price || 0,
                        price: product?.price || 0,
                        quantity: product?.quantity || 0,
                        product_type: product?.product_type || "sizes",
                        description: product?.description || "",
                        specifications: product?.specifications || "",
                        cat_id: product?.cat_id || "",
                        status: product?.status ?? true,
                        video: product?.video ? [
                            product.video
                        ] : [],
                        video_link: product?.video_link || "",
                        primaryColorId: product?.primaryColorId || null,
                        isPrimary: product?.isPrimary || false,
                        model_id: product?.influencer_id || product?.model?._id || product?.model_id || "",
                        influencer_id: product?.influencer_id || product?.model?._id || product?.model_id || "",
                        commission: product?.commission !== undefined && product?.commission !== null ? Number(product.commission) : 0,
                        commission_type: product?.commission_type || product?.commission_Type || "percentage",
                        metarial: product?.materials ? product.materials.map({
                            "CreateProductPage.useCallback[fetchProduct]": (m)=>({
                                    id: m._id
                                })
                        }["CreateProductPage.useCallback[fetchProduct]"]) : [],
                        variants: product?.variants || [],
                        media: transformedMedia,
                        weight: product?.weight || 0,
                        height: product?.height || 0,
                        breadth: product?.breadth || 0,
                        length: product?.length || 0
                    });
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorMessage"])(error));
            } finally{
                setLoading(false);
            }
        }
    }["CreateProductPage.useCallback[fetchProduct]"], [
        id
    ]);
    const fetchCommon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CreateProductPage.useCallback[fetchCommon]": async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonAPI"].getAll();
                if (response?.data?.code === "OK") {
                    setCommon(response?.data?.data || []);
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorMessage"])(error));
            } finally{
                setLoading(false);
            }
        }
    }["CreateProductPage.useCallback[fetchCommon]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateProductPage.useEffect": ()=>{
            const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storageUtils"].getUser();
            if (user?.role === "influencer") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Access restricted: Influencers can only view product details.");
                router.replace("/influencer/products");
                return;
            }
            const delay = setTimeout({
                "CreateProductPage.useEffect.delay": ()=>{
                    setLoading(true);
                    fetchCommon();
                    fetchProduct(id);
                }
            }["CreateProductPage.useEffect.delay"], 300);
            return ({
                "CreateProductPage.useEffect": ()=>clearTimeout(delay)
            })["CreateProductPage.useEffect"];
        }
    }["CreateProductPage.useEffect"], [
        fetchCommon,
        fetchProduct,
        id,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateProductPage.useEffect": ()=>{
            if (redirectTo) {
                if (redirectTo) router.push(redirectTo);
            }
        }
    }["CreateProductPage.useEffect"], [
        redirectTo,
        router
    ]);
    // for now any by monika 
    const toFormData = (data)=>{
        const formData = new FormData();
        // ── Scalar fields ──────────────────────────────────────────────────────────
        const scalarFields = [
            "title",
            "display_price",
            "price",
            "quantity",
            "product_type",
            "description",
            "specifications",
            "cat_id",
            "status",
            "video_link",
            "primaryColorId",
            "model_id",
            "influencer_id",
            "commission",
            "commission_type",
            "weight",
            "height",
            "breadth",
            "length"
        ];
        scalarFields.forEach((key)=>{
            const value = data[key];
            if (value === null || value === undefined) return;
            formData.append(key, String(value));
        });
        const finalInfluencer = data.influencer_id || data.model_id || "";
        if (finalInfluencer) {
            formData.set("influencer_id", finalInfluencer);
            formData.set("model_id", finalInfluencer);
        }
        formData.set("commission", String(data.commission !== undefined && data.commission !== null ? data.commission : 0));
        const commType = data.commission_type || "percentage";
        formData.set("commission_type", commType);
        formData.set("commission_Type", commType);
        // ── Video ──────────────────────────────────────────────────────────────────
        if (data.video && data.video.length > 0) {
            formData.append("video", data.video[0]);
        }
        // ── Variants ───────────────────────────────────────────────────────────────
        data.variants.forEach((variant, index)=>{
            formData.append(`variants[${index}]`, JSON.stringify(variant));
        });
        // ── Materials ──────────────────────────────────────────────────────────────
        data.metarial.forEach((mat, index)=>{
            formData.append(`metarial[${index}]`, JSON.stringify(mat));
        });
        // ── Media ──────────────────────────────────────────────────────────────────
        /**
     * For each media group:
     *   - Append color_id
     *   - For each file slot (already filtered — deleted ones excluded upstream):
     *       • If file binary exists (new upload OR replace) → append to `files` + set file_ref
     *       • file_id → existing DB _id (or "" for brand-new slots)
     *       • is_primary, role, sort_order always sent
     */ data.media.forEach((mediaItem, mediaIndex)=>{
            formData.append(`media[${mediaIndex}][color_id]`, mediaItem.color_id);
            mediaItem.files?.forEach((fileItem, fileIndex)=>{
                const fileRef = `file_${mediaIndex}_${fileIndex}`;
                // ── Append binary file (replace OR new upload) ──
                if (fileItem.file) {
                    const ext = fileItem.file.name.split(".").pop() ?? "jpg";
                    const baseName = fileItem.file.name.replace(/\.[^/.]+$/, "");
                    const newFileName = `${fileRef}_${baseName}.${ext}`;
                    formData.append("files", fileItem.file, newFileName);
                    // Tell the server which media[x][files][y] this binary belongs to
                    formData.append(`media[${mediaIndex}][files][${fileIndex}][file_ref]`, fileRef);
                }
                // ── file_id: existing DB _id for replace/untouched; "" for brand-new ──
                formData.append(`media[${mediaIndex}][files][${fileIndex}][file_id]`, fileItem.file_id ?? "");
                formData.append(`media[${mediaIndex}][files][${fileIndex}][is_primary]`, String(fileItem.is_primary));
                formData.append(`media[${mediaIndex}][files][${fileIndex}][role]`, fileItem.role);
                formData.append(`media[${mediaIndex}][files][${fileIndex}][sort_order]`, String(fileItem.sort_order ?? fileIndex + 1));
            });
        });
        return formData;
    };
    // Handle Submit
    const handleSubmit = async ()=>{
        setLoading(true);
        const toastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading("Updating...");
        try {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$validations$2f$product$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productValidate"])(form, setErrors)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please fix the errors in the form", {
                    id: toastId
                });
                setLoading(false);
                return;
            }
            if (!colorVariantsValid) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please fix color variant errors (color, at least 1 image, valid sizes & stock)", {
                    id: toastId
                });
                return;
            }
            form.media = variantData.images.map((img)=>({
                    color_id: img.color_id,
                    files: img.files.filter((f)=>f.file || f.file_id).map((f)=>({
                            ...f.file ? {
                                file: f.file
                            } : {},
                            file_id: f.file_id ?? null,
                            is_primary: f.is_primary,
                            role: f.role,
                            sort_order: f.sort_order
                        }))
                }));
            form.primaryColorId = variantData.primaryColorId;
            form.isPrimary = true;
            if (form.product_type === "sizes") {
                form.variants = variantData.variants;
            }
            console.log("Final Form Data:", form);
            const formData = toFormData(form);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productsAPI"].update(id, formData);
            if (response?.code === "OK") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(`Product updated successfully!`, {
                    id: toastId
                });
                setRedirectTo("/products");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$helpers$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorMessage"])(error), {
                id: toastId
            });
        } finally{
            setLoading(false);
        }
    };
    // ---------- Handlers (typed) ----------
    const handleDescriptionChange = (value)=>{
        setForm((prev)=>({
                ...prev,
                description: value
            }));
        if (errors.description) {
            setErrors((prev)=>{
                const newErrs = {
                    ...prev
                };
                delete newErrs.description;
                return newErrs;
            });
        }
    };
    const handleSpecificationsChange = (value)=>{
        setForm((prev)=>({
                ...prev,
                specifications: value
            }));
        if (errors.specifications) {
            setErrors((prev)=>{
                const newErrs = {
                    ...prev
                };
                delete newErrs.specifications;
                return newErrs;
            });
        }
    };
    const handleFieldChange = (field, value)=>{
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
        const errorKey = field;
        if (errors[errorKey]) {
            setErrors((prev)=>{
                const newErrs = {
                    ...prev
                };
                delete newErrs[errorKey];
                return newErrs;
            });
        }
    };
    const handleNumberChange = (field, value)=>{
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            handleFieldChange(field, Number(value));
        }
    };
    const hasError = (field)=>!!errors[field];
    const handleError = (field)=>{
        return errors[field] || "";
    };
    const mappedColors = common.colors.map((c)=>({
            id: c._id,
            name: c.name,
            hex: c.hex
        }));
    const mappedSizes = common.sizes.map((s)=>({
            id: s._id,
            name: s.name
        }));
    // ---------- Render ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F1F5F9] p-4 md:p-6 pb-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$product$2f$EditColorVariantsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    loading: loading,
                    product_type: form.product_type,
                    colors: mappedColors,
                    sizes: mappedSizes,
                    onChange: setVariantData,
                    onValidationChange: setColorVariantsValid,
                    productImages: productImages,
                    variants: form.variants,
                    media: form.media,
                    productId: id
                }, void 0, false, {
                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                    lineNumber: 507,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]",
                            children: "Basic Information"
                        }, void 0, false, {
                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                            lineNumber: 522,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Product Name ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 527,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.title,
                                            onChange: (e)=>handleFieldChange("title", e.target.value),
                                            placeholder: "e.g. Product Name",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("title") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 530,
                                            columnNumber: 15
                                        }, this),
                                        hasError("title") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                handleError("title")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Product Type",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 544,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.product_type,
                                            onChange: (e)=>handleFieldChange("product_type", e.target.value),
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 557,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "sizes",
                                                    children: "Readymade"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 558,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "no_sizes",
                                                    children: "Unstitched"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, this),
                                        hasError("product_type") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("product_type")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 543,
                                    columnNumber: 13
                                }, this),
                                form.product_type && form.product_type == "no_sizes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Quantity ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 569,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            min: 10,
                                            max: 50,
                                            value: form.quantity,
                                            onChange: (e)=>handleFieldChange("quantity", Number(e.target.value)),
                                            placeholder: "e.g. Product Quantity",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("quantity") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 572,
                                            columnNumber: 17
                                        }, this),
                                        hasError("quantity") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                handleError("quantity")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 585,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Category",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 593,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 592,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$select$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: `w-full px-1 py-1 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`,
                                            value: form.cat_id,
                                            onChange: (val)=>setForm({
                                                    ...form,
                                                    cat_id: val
                                                }),
                                            placeholder: "Select Category",
                                            limit: 10,
                                            fetchOptions: ({ page, limit, search })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$integration$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["categoriesAPI"].getAll({
                                                    page,
                                                    limit,
                                                    search
                                                }),
                                            mapOption: (item)=>({
                                                    label: item.title,
                                                    value: item._id
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 595,
                                            columnNumber: 15
                                        }, this),
                                        hasError("cat_id") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("cat_id")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 610,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 591,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block mb-2 text-sm font-semibold text-slate-700",
                                                    children: "Upload files (Videos)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 616,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "video/mp4",
                                                    onChange: (e)=>{
                                                        const selected = Array.from(e.target.files || []);
                                                        //❗check each file size
                                                        const oversized = selected.find((file)=>file.size > 5 * 1024 * 1024);
                                                        if (oversized) {
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Video must be under 5MB");
                                                            e.target.value = "";
                                                            return;
                                                        }
                                                        handleFieldChange("video", selected);
                                                    },
                                                    className: "block w-full text-sm text-slate-600 file:mr-3 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500 cursor-pointer border border-slate-300 rounded-lg p-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 614,
                                            columnNumber: 15
                                        }, this),
                                        form.video && typeof form.video === "string" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-slate-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                                href: form.video,
                                                target: "_blank",
                                                children: "View Uploaded Video"
                                            }, void 0, false, {
                                                fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                lineNumber: 642,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 641,
                                            columnNumber: 17
                                        }, this),
                                        hasError("video") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("video")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 613,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Video (Redirect Link)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 655,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.video_link,
                                            onChange: (e)=>handleFieldChange("video_link", e.target.value),
                                            placeholder: "e.g., Organic Cotton Bodysuit",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("video_link") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 15
                                        }, this),
                                        hasError("video_link") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("video_link")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 668,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 654,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Influencer"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.model_id || form.influencer_id || "",
                                            onChange: (e)=>{
                                                const val = e.target.value;
                                                setForm((prev)=>({
                                                        ...prev,
                                                        model_id: val,
                                                        influencer_id: val
                                                    }));
                                            },
                                            className: "w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-indigo-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Influencer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 17
                                                }, this),
                                                common?.models?.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: item._id,
                                                        children: item.name
                                                    }, item._id, false, {
                                                        fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 677,
                                            columnNumber: 15
                                        }, this),
                                        hasError("model_id") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("model_id")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 697,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 673,
                                    columnNumber: 13
                                }, this),
                                (form.model_id || form.influencer_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-purple-50/60 rounded-2xl border border-purple-100 col-span-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-black text-purple-900 uppercase tracking-wider ml-1",
                                                    children: "Commission Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 0,
                                                    step: "any",
                                                    value: form.commission !== undefined && form.commission !== null ? form.commission === 0 ? "" : form.commission : "",
                                                    onChange: (e)=>handleFieldChange("commission", e.target.value === "" ? 0 : Number(e.target.value)),
                                                    placeholder: form.commission_type === 'flat' ? 'e.g. 150 (Flat ₹)' : 'e.g. 10 (10%)',
                                                    className: "w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 710,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-purple-600 mt-1",
                                                    children: form.commission_type === 'flat' ? 'Flat commission amount in ₹ per item' : 'Commission percentage (%) of product price'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 721,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 706,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-black text-purple-900 uppercase tracking-wider ml-1",
                                                    children: "Commission Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: form.commission_type || "percentage",
                                                    onChange: (e)=>handleFieldChange("commission_type", e.target.value),
                                                    className: "w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "percentage",
                                                            children: "Percentage (%)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                            lineNumber: 742,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "flat",
                                                            children: "Flat Amount (₹)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                            lineNumber: 743,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 728,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 705,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Fabric"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 749,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: form.metarial[0]?.id || "",
                                                onChange: (e)=>handleFieldChange("metarial", [
                                                        {
                                                            id: e.target.value
                                                        }
                                                    ]),
                                                className: `flex-1 px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("metarial") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                        lineNumber: 760,
                                                        columnNumber: 19
                                                    }, this),
                                                    common?.materials?.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: item._id,
                                                            children: item.name
                                                        }, item._id, false, {
                                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                            lineNumber: 762,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 752,
                                            columnNumber: 15
                                        }, this),
                                        hasError("metarial") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("metarial")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 776,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 782,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RichTextEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: form.description,
                                            onChange: handleDescriptionChange,
                                            placeholder: "Product description (supports bold, lists, headings...)"
                                        }, form.description, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 785,
                                            columnNumber: 15
                                        }, this),
                                        hasError("description") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs mt-1",
                                            children: handleError("description")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 792,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 781,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: "specifications"
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 798,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RichTextEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: form.specifications,
                                            onChange: handleSpecificationsChange,
                                            placeholder: "Product description (supports bold, lists, headings...)"
                                        }, form.specifications, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 801,
                                            columnNumber: 15
                                        }, this),
                                        hasError("specifications") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs mt-1",
                                            children: handleError("specifications")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 808,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 797,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                            lineNumber: 525,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                    lineNumber: 521,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]",
                            children: "Dimensions"
                        }, void 0, false, {
                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                            lineNumber: 818,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Weight (kg) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 824,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 823,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.weight,
                                            onChange: (e)=>handleNumberChange("weight", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("weight") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 826,
                                            columnNumber: 15
                                        }, this),
                                        hasError("weight") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("weight")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 837,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 822,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Height (cm) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 844,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 843,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.height,
                                            onChange: (e)=>handleNumberChange("height", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("height") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 846,
                                            columnNumber: 15
                                        }, this),
                                        hasError("height") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("height")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 842,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Breadth (cm) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 859,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.breadth,
                                            onChange: (e)=>handleNumberChange("breadth", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("breadth") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 862,
                                            columnNumber: 15
                                        }, this),
                                        hasError("breadth") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("breadth")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 871,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 858,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Length (cm) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 876,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 875,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.length,
                                            onChange: (e)=>handleNumberChange("length", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("length") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 878,
                                            columnNumber: 15
                                        }, this),
                                        hasError("length") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("length")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 887,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 874,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                            lineNumber: 821,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                    lineNumber: 817,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]",
                            children: "Pricing"
                        }, void 0, false, {
                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                            lineNumber: 895,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "Base Price ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 900,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.display_price,
                                            onChange: (e)=>handleNumberChange("display_price", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("display_price") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 903,
                                            columnNumber: 15
                                        }, this),
                                        hasError("display_price") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("display_price")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 914,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 899,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1",
                                            children: [
                                                "MRP (₹) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                                    lineNumber: 921,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 920,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            value: form.price,
                                            onChange: (e)=>handleNumberChange("price", e.target.value),
                                            placeholder: "0.00",
                                            className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("price") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 923,
                                            columnNumber: 15
                                        }, this),
                                        hasError("price") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-xs",
                                            children: handleError("price")
                                        }, void 0, false, {
                                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                                            lineNumber: 932,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                                    lineNumber: 919,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/products/edit/[id]/page.tsx",
                            lineNumber: 898,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                    lineNumber: 894,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center pt-8 pb-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: loading,
                        onClick: handleSubmit,
                        className: "w-full max-w-md bg-indigo-600 text-white py-5 rounded-full font-black uppercase text-sm tracking-wider shadow-xl hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3",
                        children: [
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "animate-spin",
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/app/products/edit/[id]/page.tsx",
                                lineNumber: 946,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/app/products/edit/[id]/page.tsx",
                                lineNumber: 948,
                                columnNumber: 15
                            }, this),
                            loading ? "Updating..." : "Update Product"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/products/edit/[id]/page.tsx",
                        lineNumber: 940,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/products/edit/[id]/page.tsx",
                    lineNumber: 939,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/products/edit/[id]/page.tsx",
            lineNumber: 505,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/products/edit/[id]/page.tsx",
        lineNumber: 504,
        columnNumber: 5
    }, this);
}
_s(CreateProductPage, "WWBp3+POtFIt8EKPacNkAg9z/H0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = CreateProductPage;
var _c;
__turbopack_context__.k.register(_c, "CreateProductPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_bb44b080._.js.map