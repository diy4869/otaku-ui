import { jsx as _jsx } from "react/jsx-runtime";
import * as ts from 'typescript';
import { useRef, useState, useEffect } from 'react';
import { createSystem, createDefaultMapFromCDN, createVirtualCompilerHost, createVirtualTypeScriptEnvironment } from '@typescript/vfs';
import lzstring from 'lz-string';
// import zh_CN from 'monaco-editor-nls/locale/zh-hans.json'
import throttle from 'lodash/throttle';
// setLocaleData(zh_CN)
import './style.scss';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
export const Editor = (props) => {
    const { code, lang } = props;
    const divEl = useRef(null);
    const [transformCode, setTransformCode] = useState('');
    const compilerOptions = {
        noEmit: false,
        noEmitOnError: true,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES5,
        jsx: ts.JsxEmit.React,
        declration: true,
        strict: true,
        noImplicitAny: true,
        lib: ['esnext', 'dom'],
        moduleResolution: ts.ModuleResolutionKind.NodeJs
    };
    let editor;
    const base = {
        compilerOptions: compilerOptions,
        fileName: 'index.tsx',
        reportDiagnostics: true
    };
    const initEditor = () => {
        editor = monaco.editor.create(divEl.current, {
            value: code,
            language: 'typescript',
            theme: 'vs',
            wordWrap: 'on',
            minimap: {
                enabled: false
            },
        });
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: ts.JsxEmit.React
        });
        editor.onDidChangeModelContent(() => {
            console.log(editor.getValue());
            throttle(() => {
                const data = ts.transpileModule(editor.getValue(), base);
                setTransformCode(data.outputText);
            }, 100)();
        });
    };
    useEffect(() => {
        const data = ts.transpileModule(code, base);
        console.log(data);
        setTransformCode(data.outputText);
        new ResizeObserver(() => {
            editor?.layout();
        }).observe(document.body);
        const getTypescriptCDN = async () => {
            console.log(divEl);
            if (divEl.current) {
                await initEditor();
                const fsMap = await createDefaultMapFromCDN(compilerOptions, ts.version, true, ts, lzstring);
                fsMap.set('index.tsx', code);
                const system = createSystem(fsMap);
                const host = createVirtualCompilerHost(system, compilerOptions, ts);
                const program = ts.createProgram({
                    rootNames: [...fsMap.keys()],
                    options: compilerOptions,
                    host: host.compilerHost
                });
                const env = createVirtualTypeScriptEnvironment(system, ["index.ts"], ts, compilerOptions);
                // Requests auto-completions at `path.|`
                const completions = env.languageService.getCompletionsAtPosition("index.ts", code.length, {});
                const typeChecker = program.getTypeChecker();
                console.log(env, completions);
                console.log('324', typeChecker);
                program.emit();
            }
        };
        getTypescriptCDN();
        return () => {
            editor?.dispose();
        };
    }, []);
    return (_jsx("div", { className: 'editor-container', children: _jsx("div", { className: 'editor', ref: divEl }) }));
};
