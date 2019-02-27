import styled from 'styled-components'

export default styled.div`
  line-height: normal;
  font-size: 13px;
  outline-width: 0;
  outline: none;
  position: relative;
  z-index: 0;

  .filters {
    margin-left: 5px;
    margin-top: 15px;
    list-style-type: none;
    padding: 0;
    .filter {
      margin-left: 10px;
      font-size: 14px;
      display: inline-block;
    }
  }
  .search-bar {
    .search-right {
      position: absolute;
      right: 8px;
      top: 7px;
      cursor: pointer;
      .search-button {

        display: inline-block;
        padding: 5px;
        width: 30px;
        height: 30px;
      }
    }
    position: relative;
    vertical-align: top;
    background-color: #fff;
    height: 44px;
    vertical-align: top;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);

    &:hover, &:active, &.input-focused {
      box-shadow: 0 3px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
    }
    transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
    &.scoped {
      .scope {
        position: absolute;
        left:9px;
        top: 8px;
        padding: 5px;
        border: 1px solid $lightGrey;
        color: $grey;
      }
      .input1{
        margin-left: 60px;
        width: calc(100% - 95px);
      }
    }
    .input1 {
      width: calc(100% - 45px);
      margin-left: 15px;
      margin-top: 8px;
      border: none;
      padding: 0px;
      height: auto;
      background: transparent;
      z-index: 6;
      outline: none;
    }
    .input2 {
      border: none;
      padding: 0px;
      margin: 0px;
      height: auto;
      width: 100%;
      position: absolute;
      z-index: 1;
      background-color: transparent;
      -webkit-text-fill-color: silver;
      color: silver;
      left: 0px;
      visibility: hidden;
    }
    .the-bar {
      -webkit-box-sizing: border-box;
      height: 100%;
      overflow: hidden;
      padding: 6px 9px 0;
    }
  }
`
