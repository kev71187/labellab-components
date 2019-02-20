export default {css: `
    .search-section{
        line-height:normal;
        font-size:13px;
        outline-width:0;
        outline:none;
        position:relative;
        z-index:0
    }
    .search-section .filters{
        margin-left:5px;
        margin-top:15px;
        list-style-type:none;
        padding:0
    }
    .search-section .filters .filter{
        margin-left:10px;
        font-size:14px;
        display:inline-block
    }
    .search-section .search-bar{
        position:relative;
        background-color:#fff;
        height:44px;
        vertical-align:top;
        border-radius:2px;
        box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);
        transition:box-shadow .2s cubic-bezier(.4,0,.2,1)
    }
    .search-section .search-bar .search-right{
        position:absolute;
        right:8px;
        top:7px;
        cursor:pointer
    }
    .search-section .search-bar .search-right .search-button{
        display:inline-block;
        padding:5px;
        width:30px;
        height:30px
    }
    .search-section .search-bar.input-focused,.search-section .search-bar:active,.search-section .search-bar:hover{
        box-shadow:0 3px 8px rgba(0,0,0,.2),0 0 0 1px rgba(0,0,0,.08)
    }
    .search-section .search-bar.scoped .scope{
        position:absolute;
        left:9px;
        top:8px;
        padding:5px;
        border:1px solid #e3e3e3;
        color:#444
    }
    .search-section .search-bar.scoped .input1{
        margin-left:60px;
        width:calc(100% - 95px)
    }
    .search-section .search-bar .input1{
        width:calc(100% - 45px);
        margin-left:15px;
        margin-top:8px;
        border:none;
        padding:0;
        height:auto;
        background:url(&quot;
        data:image/gif;
        base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D&quot;
        ) transparent;
        z-index:6;
        outline:none
    }
    .search-section .search-bar .input2{
        border:none;
        padding:0;
        margin:0;
        height:auto;
        width:100%;
        position:absolute;
        z-index:1;
        background-color:transparent;
        -webkit-text-fill-color:silver;
        color:silver;
        left:0;
        visibility:hidden
    }
    .search-section .search-bar .the-bar{
        -webkit-box-sizing:border-box;
        height:100%;
        overflow:hidden;
        padding:6px 9px 0
    }
  `
}
