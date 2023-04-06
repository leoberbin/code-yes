import React from 'react';
import ReactDOM from 'react-dom/client';
import {marked}  from 'marked'
import './index.css';
(function t(){
    function tm(input) {
        return { __html: marked(`${input}`) };
    }
    marked.setOptions({
        breaks: true
      });
    let uhtml = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";
    let ucss = "#body{\n  margin: 1rem;\n  background-color:#BFF9E9\n}\n#preview pre {\n    margin: 1rem;\n    display: block;\n    overflow: auto;\n    background: white;\n    padding: 5px;\n    line-height: 1.2;\n    border-radius: .5rem\n}\n#preview code {\n    color: gray;\n    background: white;\n    font-size: 0.85rem;\n    font-weight: bolder;\n}\n#preview blockquote {\n    border-left: 3px solid #224b4b;\n    color: #224b4b;\n    padding-left: 5px;\n    margin-left: 25px;\n}\nthead {\n    display: table-header-group;\n    vertical-align: middle;\n    border-color: inherit;\n}\ntbody {\n    display: table-row-group;\n    vertical-align: middle;\n    border-color: inherit;\n}\ntr {\n    display: table-row;\n    vertical-align: inherit;\n    border-color: inherit;\n}\n#preview td, #preview th {\n    border: 2px solid #224b4b;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n#preview img{\n    width:100%;\n    margin: 1rem auto;\n}"
    class App extends React.Component{
        constructor(props){
            super(props);
            this.state={
                languages:[
                    { name:"html", color:"#F95844", icon:"", input:uhtml,},
                    { name:"css", color:"#47FFFF", icon:"", input:ucss,},
                    { name:"javascript", color:"#EEFF47", icon:"", input:"This editor is not available at the moment",}
                ],
                chanel:0,
                input:uhtml,
                console:!0,
            };
            this.changeLanguage=this.changeLanguage.bind(this);
            this.consoleStatus=this.consoleStatus.bind(this);
            this.handleInput=this.handleInput.bind(this);
        }
        handleInput(event){
            let input=this.state.languages[this.state.chanel];
            input['input'] = event.target.value;
            this.setState({
                input : input['input']
            });
        }
        changeLanguage(event){ 
            const id = event.target.id
            this.setState({
                chanel:parseInt(id),
            });
        }
        consoleStatus(){
            this.setState({
                console : !this.state.console
            });
        }
        render(){
            let ls= this.state.languages;
            let m= this.state.languages[this.state.chanel];
            return(
                <div id='folder'>
                {this.state.console ? 
                    <div id='console'>
                        <Header c={m.color} l={ls} fc={this.changeLanguage} fv={this.consoleStatus}/>
                        <textarea id='editor' value={m.input} onChange={this.handleInput}></textarea>
                    </div> : 
                    <button id='view' style={{position:"fixed", backgroundColor: "rgba(0, 0, 0, 0.750)"}} onClick={this.consoleStatus}>
                        <i className='bi bi-eye-fill'></i>
                    </button>              
                }
                    <Preview css={ls[1].input} html={ls[0].input}/>
                </div>
            );
        }
    }
    class Header extends React.Component{
        render(){
            let style={ color:this.props.c, 
                        boxShadow: `inset 0 13px 0 0 ${this.props.c}`}
            function add(list, funct){
                return list.map((x, i)=>{
                        return <button key={i} id={i} style={{backgroundColor:x.color}} onClick={funct}>
                                    {x.name}
                                </button>
                }) 
            }
            return(
                <div id='header'>
                    <header>
                        <button id='view' onClick={this.props.fv}>
                            <i className="bi bi-eye-slash-fill"></i>
                        </button>
                        <h1 style={{color:style.color}}>code yes!</h1>
                    </header>
                    <div id='bar'>
                        <div id='list'>
                            {add(this.props.l, this.props.fc)}
                            <abbr id='guide-color' title='Look this Color Guide'>
                                <input type='color' defaultValue='#7b0e0e'/>
                            </abbr>
                        </div>
                        <div id='indicador' style={{boxShadow:style.boxShadow}}></div>
                    </div>
                </div>
            );
        }
    }
    class Preview extends React.Component{
        render(){
            return (
                <div id='body'>
                    <style dangerouslySetInnerHTML={{ __html: this.props.css}}></style>
                    <div id='preview' dangerouslySetInnerHTML={tm(this.props.html)}></div>
                </div>
            );
        }
    }
  const app = ReactDOM.createRoot(document.getElementById('root'));
  app.render(<App/>)
  return 
})()


