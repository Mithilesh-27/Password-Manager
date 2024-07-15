"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
    const [Type, setType] = useState("password")
    const [Site, setSite] = useState({ website: "", username: "", password: "" })
    const [AllSites, setAllSites] = useState([])

    const getPasswords = async () => {
        let res = await fetch("http://localhost:3000/")
        let passwords = await res.json()
        setAllSites(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const savePassword = async () => {
        if (Site.website.length > 3 && Site.username.length > 3 && Site.password.length > 3) {
            let id = uuidv4()
            setAllSites([...AllSites, { ...Site, id }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Site, id }) })
            setSite({ website: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        else alert("Invalid credentials! Website URL, Username and Password should have at least 4 characters")
    }

    const handleChange = (event) => {
        let newSite = { ...Site }
        newSite = { ...newSite, [event.target.name]: event.target.value }
        setSite(newSite)
    }

    const handleCopy = (credentials) => {
        toast('Copied to clipboard!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(credentials)
    }

    const editPassword = async (id) => {
        let website = AllSites.find(site => site.id === id)
        let websites = AllSites.filter(site => site !== website)
        setSite(website)
        setAllSites(websites)
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(website) })
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            let website = AllSites.find(site => site.id === id)
            let websites = AllSites.filter(site => site !== website)
            setAllSites(websites)
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(website) })
            toast('Password Deleted!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <ToastContainer>
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            </ToastContainer>
            <div className='w-[60vw] mx-auto mt-24 flex flex-col items-center text-3xl md:text-6xl text-white font-[poppins] text-center'>
                Your one stop solution for storing passwords
            </div>
            <div className='w-[80vw] mx-auto flex flex-col gap-6 mt-8'>
                <input type="url" required placeholder='Enter Website URL' name='website' value={Site.website} onChange={handleChange} className='h-10 rounded-full px-4 focus-within:outline-none placeholder:text-gray-400' />
                <div className="credentials md:flex gap-6">
                    <input type="text" required placeholder='Enter Username' name='username' value={Site.username} onChange={handleChange} className='h-10 w-full rounded-full px-4 focus-within:outline-none placeholder:text-gray-400' />
                    <div className="password w-full flex relative mt-6 md:mt-0">
                        <input type={Type} required placeholder='Enter Password' name='password' value={Site.password} onChange={handleChange} className='h-10 w-[calc(100%-3rem)] rounded-tl-full rounded-bl-full px-4 focus-within:outline-none placeholder:text-gray-400' />
                        <div className="show w-12 absolute right-0 p-2 hover:cursor-pointer rounded-tr-full rounded-br-full bg-white">
                            {Type === "password" ? <img src="/eyeclose.svg" alt="show" onClick={() => setType("text")} /> : <img src="/eye.svg" alt="hide" onClick={() => setType("password")} />}
                        </div>
                    </div>
                </div>
                <button className='save bg-green-600 w-fit flex gap-1 font-semibold text-lg justify-center items-center px-3 py-2 mx-auto rounded-full hover:bg-green-500' onClick={savePassword}>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    <span className='text-[#121331] '>Save</span>
                </button>
                {AllSites.length === 0 ? <div className='font-bold text-white font-[poppins] text-2xl md:text-3xl m-auto mt-12 text-center'>No Passwords to show</div> : <div className='font-bold text-white font-[poppins] text-2xl md:text-3xl m-auto mt-12 text-center'>Your Passwords</div>}
                <table className="table-auto break-all w-full text-sm md:text-lg mb-40 rounded-xl m-auto overflow-hidden">
                    {AllSites.length !== 0 && <thead className='bg-green-800'>
                        <tr>
                            <th className='py-3 px-1 bg-green-800 text-white'>Website</th>
                            <th className='py-3 px-1 bg-green-800 border-x-[1px] text-white'>Username</th>
                            <th className='py-3 px-1 bg-green-800 border-r-[1px] text-white'>Password</th>
                            <th className='py-3 px-1 bg-green-800 text-white'>Actions</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {AllSites.length !== 0 && AllSites.map((item) => {
                            return <tr key={item.id} className='border-t-[1px] bg-[#1c1c1c] text-white'>
                                <td className='text-center px-1 py-3 hover:cursor-pointer hover:underline'><a href={item.website} target='_blank'>{item.website}</a></td>
                                <td className='text-center px-1 py-3 border-x-[1px]'>
                                    <div className='flex justify-center items-center relative'>
                                        <div className='mr-10 xl:mr-0'>{item.username}</div>
                                        <img src="/copy.svg" alt="copy" title='copy' className='invert absolute right-2 cursor-pointer hover:bg-gray-50 active:bg-[#e89ad3] rounded-lg p-1' onClick={() => handleCopy(item.username)} />
                                    </div>
                                </td>
                                <td className='text-center px-1 py-3 border-r-[1px]'>
                                    <div className='flex justify-center items-center relative'>
                                        <div className='mr-10 xl:mr-0'>{item.password}</div>
                                        <img src="/copy.svg" alt="copy" title='copy' className='invert absolute right-2 cursor-pointer hover:bg-gray-50 active:bg-[#e89ad3] rounded-lg p-1' onClick={() => handleCopy(item.password)} />
                                    </div>
                                </td>
                                <td className='text-center px-1 py-3'>
                                    <div className="actions flex flex-col items-center gap-2">
                                        <img src="/edit.svg" alt="edit" className='invert hover:bg-gray-50 rounded-lg p-1 cursor-pointer' title='edit' onClick={() => editPassword(item.id)} />
                                        <img src="/delete.svg" alt="delete" className='hover:bg-[#0b0b0b] rounded-lg p-1 cursor-pointer ring-[1px] ring-red-600' title='delete' onClick={() => deletePassword(item.id)} />
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Manager
