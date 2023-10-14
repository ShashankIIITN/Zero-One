import React, { useState } from 'react'
import NewContext from './NewContext'
import { json } from 'react-router-dom';

const DataContext = (props) => {
    /*const Tabs =
    [
        {
            "_id": "639deb029f2a1c14cb63455d",
            "user": "639db828cdd35626ef0b441f",
            "title": "My First Note",
            "description": "Hello this is my first note, just checking that everything works fine and there is any error or not",
            "tag": "Checker",
            "date": "2022-12-17T16:14:58.071Z",
            "__v": 0
        },
            {
                "_id": "639deb2a9f2a1c14cb63455f",
                "user": "639db828cdd35626ef0b441f",
                "title": "My Second Note",
                "description": "Hello this is my first note, just checking that everything works fine and there is any error or not",
                "tag": "Checker",
                "date": "2022-12-17T16:15:38.885Z",
                "__v": 0
            },
            {
                "_id": "639e15ace12646850315fb61",
                "user": "639db828cdd35626ef0b441f",
                "title": "My third Note",
                "description": "Hello this is my first note, just checking that everything works fine and there is any error or not",
                "tag": "Checker",
                "date": "2022-12-17T19:17:00.341Z",
                "__v": 0
            },
            {
                "_id": "63a051acff141aaca8526c11",
                "user": "639db828cdd35626ef0b441f",
                "title": "My fourth Note",
                "description": "Hello this is my fourth note, just checking that everything works fine and there is any error or not",
                "tag": "Checker",
                "date": "2022-12-19T11:57:32.334Z",
                "__v": 0
            }
        ]*/
    const Host = process.env.REACT_APP_HOST || "http://localhost:4000";
    const [Tabs, setTabs] = useState(null);
    const [SelectedTabs, setSelectedTabs] = useState(null);
    const [SelectedList, setSelectedList] = useState([]);
    const [progress, setProgress] = useState(0);

    const FetchAllTabs = async () => {
        console.log("adwd");
        // setProgress(30);
        const url = `${Host}/api/Tabs/get-alltabs`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("Token")
            }
        })
        // setProgress(70);
        const Tabsdata = await response.json();
        // setProgress(90);
        console.log(Tabsdata);
        setTabs(Tabsdata);
        // setProgress(100);
    }
    const AskQuery = async (qry) => {
        // console.log("query");
        // setProgress(30);
        const url = "http://192.168.137.74:5005/webhooks/rest/webhook"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"same-origin",
            body: JSON.stringify({
                "sender": "rasa",
                "message": qry
            })
        })
        // setProgress(70);
        const res = await response.json();
        // // setProgress(90);
        // console.log(res);
        // console.log(qry)
        return res;
        // setProgress(100);
    }
    const CreateTab = async (Tab, Content) => {
        let sts = false;
        const url = `${Host}/api/Tabs/create-note`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
                body: JSON.stringify({ Tab, Content })
            })
            const resjson = await response.json();
            let newnote = Tabs.concat(resjson);
            if (response.ok) {

                setTabs(newnote);
            }
            sts = {Tabdata:resjson,stats:response.ok};
        } catch (error) {
            console.log(error);
        }
        return sts;
    }
    const UpdateTab = async (Tab, Content, tab_id) => {
        let sts = false;
        const url = `${Host}/api/Tabs/update-tab/${tab_id}`
        console.log("my name is khan ")

        try {

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
                body: JSON.stringify({ Tab:Tab, Content:Content })
            })
            let resjson = await response.json();
            await FetchAllTabs();
            console.log("updating")
            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        return sts;

        console.log(Tab)
        console.log(Content)
    }
    const DeleteTab = async (tab_id) => {
        let sts = false;
        const url = `${Host}/api/Tabs/delete-Tab/${tab_id}`

        try {

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
            })
            let resjson = await response.json();
            if (response.ok) {
                let newnote = Tabs.filter((Tabs) => { return Tabs._id !== tab_id })
                setTabs(newnote);
            }

            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        return sts.success;
    }
    const MultiDelete = async () => {
        setProgress(30);
        for (let index = 0; index < SelectedList.length; index++) {
            const element = SelectedList[index];
            await DeleteTab(element);
        }
        setProgress(60);
        setSelectedList([]);
        setProgress(80);
        await FetchAllTabs();
        setProgress(100);
    }
    const addSelected = (id) => {
        let ap = true;
        let list = SelectedList;
        for (let index = 0; index < SelectedList.length; index++) {
            const element = SelectedList[index];
            if (element === id) {
                ap = false;

            }

        }
        if (ap) {

            list.push(id);
        }
        setSelectedList(list);
    }
    const deleteSelected = (id) => {
        let list = [];
        SelectedList.forEach(element => {
            if (element !== id) {
                list.push(element);
            }
        });
        setSelectedList(list);
    }
    const deleteClear = () => {
        let list = [];
        setSelectedList(list);
    }

    const SignUp = async (name, email, password) => {
        setProgress(30);
        let sts = false;
        const url = `${Host}/api/auth/create-user/`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            setProgress(60);
            const resjson = await response.json();
            setProgress(80);
            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        return sts;
    }
    const Login = async (email, password) => {
        setProgress(30);
        let sts = false;
        const url = `${Host}/api/auth/login-user/`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            setProgress(60);
            const resjson = await response.json();
            setProgress(80);
            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        return sts;
    }
    return (
        <NewContext.Provider value={{ Tabs: Tabs, FetchTabs: FetchAllTabs, CreateTab: CreateTab, UpdateTab: UpdateTab, setSelectedTabs: setSelectedTabs, SelectedTabs: SelectedTabs, DeleteTab: DeleteTab, append: addSelected, delete: deleteSelected, MultiDelete: MultiDelete, deleteClear: deleteClear, SignUp: SignUp, Login: Login, progress: progress, setProgress: setProgress, AskQuery: AskQuery }}>
            {props.children}
        </NewContext.Provider>
    )
}

export default DataContext;