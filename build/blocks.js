(()=>{"use strict";const e=window.wp.blocks,t=window.React,o=window.wp.i18n,r=window.wp.blockEditor,a=JSON.parse('{"UU":"create-block/pe-charitable-sample"}');(0,e.registerBlockType)(a.UU,{edit:function(){return(0,t.createElement)("p",{...(0,r.useBlockProps)()},(0,o.__)("Pe Charitable Sample – hello from the editor!","pe-charitable-sample"))},save:function(){return(0,t.createElement)("p",{...r.useBlockProps.save()},"Pe Charitable Sample – hello from the saved content!")}})})();