import React, { useState, useEffect, useRef, useContext } from 'react'
import myImage from '../images/person.jpg'
import myImage2 from '../images/bott.jpg'
import NewContext from '../context/NewContext'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { useFilePicker } from 'use-file-picker';

function TabContent(props) {
    const [fileSelected, setfileSelected] = useState(false)
    const { openFilePicker, filesContent, loading, clear } = useFilePicker({
        readAs: 'DataURL',
        accept: '.txt',
        onFilesSelected: ({ plainFiles, filesContent, errors }) => {
            // this callback is always called, even if there are errors
            console.log('onFilesSelected', plainFiles, filesContent, errors);
            console.log({ pf: plainFiles, fc: filesContent, er: errors });
        },
        onFilesRejected: ({ errors }) => {
            // this callback is called when there were validation errors
            console.log('onFilesRejected', errors);
        },
        onFilesSuccessfullySelected: async ({ plainFiles, filesContent }) => {
            // this callback is called when there were no validation errors
            console.log('onFilesSuccessfullySelected', plainFiles, filesContent);
            console.log({ pf: plainFiles, fc: filesContent });
            setfileSelected(true)

            // await fetch("http://127.0.0.1:5000/chatbot", {
            //     method:"Post",
            //     headers:{
            //         "Content-Type":"application/json"
            //     },

            //     body:{
            //         "type": "file",
            //         "user_input":"hii",
            //         "file":filesContent.content
            //     }
            // })
        },
        onClear: () => {
            // this callback is called when the selection is cleared
            console.log('onClear');
        },
    });
    const [curNoteData, setcurNoteData] = useState(null)
    const [lloading, setLoading] = useState(false)
    let id = 0;
    const Context = useContext(NewContext)
    const reff = useRef(null)
    const [chatData, setchatData] = useState([])

    const [query, setquery] = useState("")

    const deleteSelectionHandler = (e) =>{
        e.preventDefault()
        clear()
        setfileSelected(false)
    }
    const selecthandler = async (e) => {
        e.preventDefault()
        if (!fileSelected) {
            openFilePicker()
        }
        let ques = reff.current.value;

        if (fileSelected) {
            if (ques.trim() === "") {
                alert("pls ask something!");
            } else {
                setLoading(true)
                let res = await fetch("http://localhost:5000/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "query": ques })
                })

                let data = await res.json();
                let qry = {}
                qry.me = ques
                qry.bot = data.response
                setchatData([...chatData, qry])
                let chatList = chatData;

                await Context.UpdateTab("NewChat", chatList, props.id)
                console.log(qry)

                let dac = document.getElementsByClassName("chatMenu")
                dac[0].scrollTo({ left: 0, top: dac[0].scrollHeight, behavior: "smooth" });
            }
            setLoading(false)

        }
    }

    useEffect(() => {
        setchatData(props.data)
        let dac = document.getElementsByClassName("chatMenu")
        dac[0].scrollTo({ left: 0, top: dac[0].scrollHeight, behavior: "smooth" });
        console.log(dac)

    }, [])

    const AskHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        id++;
        let ques = reff.current.value;
        console.log(ques)

        if (ques.trim() === "") {
            alert("pls ask something!");
        } else {
            let qry = {}
            let res = await Context.AskQuery(ques)
            qry.me = ques

            // let str = ""

            // res.map((e) => {
            //     if (e.text != null)
            //         str += `<div id = 'newline' >${e.text}</div>`;
            // })
            qry.bot = res

            // chatlist.push(qry)
            setchatData([...chatData, qry])

            let chatList = chatData;

            await Context.UpdateTab("NewChat", chatList, props.id)
            console.log(props.id)
            // console.log(id)



            let dac = document.getElementsByClassName("chatMenu")
            dac[0].scrollTo({ left: 0, top: dac[0].scrollHeight, behavior: "smooth" });
            // console.log(dac[0].scrollHeight)
        }
        setLoading(false)

    }

    console.log("get")

    return (
        <>
            <div className='chatMenu container w-75 '>
                {
                    chatData && chatData.map((e, ind) => {
                        return (
                            <div className='message-container' key={ind}>
                                <div className='layout'>
                                    <div className='sender'>
                                        <img src={myImage} className='person' alt="My Image" />
                                        <p className='mee text h5'>{e.me}</p>
                                    </div>
                                    <div className='bott'>
                                        <img src={myImage2} className='person' alt="My Image2" />
                                        {typeof e.bot != "string" && e.bot.map(e => {
                                            // console.log("ai")
                                            // console.log(e)
                                            if (e.text == null)
                                                return <img src={e.image} className='respo text h5 w-25'></img>
                                            else return <p className='respo text h5'>{e.text}</p>
                                        })}
                                        {typeof e.bot === "string" &&
                                            <p className=' text h5'>{e.bot}</p>

                                        }

                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                {lloading && <Loader color="aqua" distance={5} size={10} />}
            </div>
            {/* <div className="asking position-absolute bottom-0 w-75 align-self-center input-group mb-3">
                <input type="text" className="form-control asking" placeholder="Ask about something" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button type="button" className="btn btn-success" id="button-addon2">Ask</button>
            </div> */}
            {/* <div className="asking position-absolute bottom-0 w-75 align-self-center input-group mb-3">
                <input type="text" className="form-control" ref={reff} placeholder="Ask me Anything" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-success" type="button" id="button-addon2" onClick={AskHandler}>Ask</button>
            </div> */}
            <div className="asking position-absolute bottom-0 w-75 align-self-center input-group mb-3">
                <input type="text" className="form-control transparent-input" ref={reff} placeholder="Ask me Anything" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button type="button" class="btn btn-success" onClick={selecthandler}><span className='icon3'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor" class="bi bi-star" ><path d="M64 464H96v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288H336V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z" /></svg></span>PDF</button>
                <button className="btn btn-success transparent-button" type="button" id="button-addon2" onClick={AskHandler}>Ask</button>

                {fileSelected && <button className="btn btn-danger transparent-button" type="button" id="button-addon2" onClick={deleteSelectionHandler}><i class="fa-solid fa-xmark"></i></button>}
            </div>

        </>
    )
}

export default TabContent