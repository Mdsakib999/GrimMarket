import { useSelector } from "react-redux";
import UtilsComponents from "../../Components/UtilsComponensts/UtilsComponents";
import { SiXmpp } from "react-icons/si";
import { FaFileInvoice, FaTelegram } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useUserPasswordChangeMutation } from "../../Redux/Features/Auth/authApi";

const Settings = () => {
    const { userName, role } = useSelector((state) => state.auth)
    const [uploadpassword] = useUserPasswordChangeMutation()
    const handelPasswordChange = async (e) => {
        e.preventDefault()
        const toastId = toast.loading('Loading......')
        const form = e.target
        const currentPassword = form.currentPassword.value
        const newPassword = form.newPassword.value
        const confirmPassword = form.confirmPassword.value
        if (newPassword !== confirmPassword) {
            return toast.error("Password doesn't Match", { id: toastId })
        }
        else {
            const data = { currentPassword, newPassword, userName }
            const res = await uploadpassword(data)
            if (res.data) {
                toast.success('Password update Successfully', { id: toastId })
            }
            else {
                toast.error(res?.error?.data?.message, { id: toastId })
            }

        }
    }
    return (
        <div className=" mb-16">
            <div>
                <UtilsComponents title={'Settings'} description={'Here you can change your account settings'} />
            </div>
            <div className="mt-36 mx-6 bg-[#16191E] rounded-md" >
                <div className="p-4 flex md:flex-row flex-col gap-4" >
                    <p className="text-5xl p-12 text-[#238C3D] rounded-lg inline-block font-bold bg-[#182722] ">{userName.split('').slice(0, 2).join('').toUpperCase()}</p>
                    <div>
                        <p className="text-xl inline-block font-bold">{userName}</p>
                        <span className="ms-4 bg-[#1A3D28] text-sm px-3 rounded-full">{role === 'customer' ? 'user' : role === 'admin' ? 'admin' : ''}</span>
                        <p className="mt-4">0 / 0.00$ Payments</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 mx-1 md:mx-6 bg-[#16191E] p-4 rounded-md ">
                <p className="text-xl  border-b pb-3">Settings</p>
                <form >
                    <div className="border-b">
                        <div className="w-[60%] flex  justify-between items-center py-8 ">
                            <p>Xmpp</p>
                            <div className="relative">
                                <input type="text" className="w-[190%]  ps-20 h-[45px] rounded-md bg-transparent border outline-none focus:border-[#238C3D]" />
                                <span className="bg-[#1F2025] inline-block rounded-md ms-[1px] px-5 py-[9px] absolute top-[1px] z-0 ">
                                    <SiXmpp className="text-white text-2xl " />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-b">
                        <div className="w-[60%] flex justify-between items-center py-8 ">
                            <p>Telegram</p>
                            <div className="relative">
                                <input type="text" className="w-[190%]  ps-20 h-[45px] rounded-md bg-transparent border outline-none focus:border-[#238C3D]" />
                                <span className="bg-[#1F2025] inline-block rounded-md ms-[1px] px-5 py-[9px] absolute top-[1px] z-0 ">
                                    <FaTelegram className="text-white text-2xl " />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="flex items-center gap-2 px-3 py-1 rounded-sm text-[#238C3D] bg-[#182722] hover:text-white hover:bg-green-600 ">Update <FaFileInvoice /></button>
                    </div>
                </form>
            </div>
            <div className="mt-8 mx-2 md:mx-6 bg-[#16191E] p-4 rounded-md ">
                <p className="text-xl  border-b pb-3">Change Password</p>
                <form onSubmit={handelPasswordChange} >
                    <div className="border-b">
                        <div className="w-[60%] flex justify-between items-center py-8 ">
                            <p>Current password</p>
                            <div className="relative">
                                <input type="text" name="currentPassword" className="w-[190%]  ps-20 h-[45px] rounded-md bg-transparent border outline-none focus:border-[#238C3D]" />
                                <span className="bg-[#1F2025] inline-block rounded-md ms-[1px] px-5 py-[9px] absolute top-[1px] z-0 ">
                                    <RiLockPasswordFill className="text-white text-2xl " />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-b">
                        <div className="w-[60%] flex justify-between items-center py-8 ">
                            <p>New password</p>
                            <div className="relative">
                                <input type="text" name="newPassword" className="w-[190%]  ps-20 h-[45px] rounded-md bg-transparent border outline-none focus:border-[#238C3D]" />
                                <span className="bg-[#1F2025] inline-block rounded-md ms-[1px] px-5 py-[9px] absolute top-[1px] z-0 ">
                                    <RiLockPasswordFill className="text-white text-2xl " />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-b">
                        <div className="w-[60%] flex justify-between items-center py-8 ">
                            <p>Confirm password</p>
                            <div className="relative">
                                <input type="text" name="confirmPassword" className="w-[190%]  ps-20 h-[45px] rounded-md bg-transparent border outline-none focus:border-[#238C3D]" />
                                <span className="bg-[#1F2025] inline-block rounded-md ms-[1px] px-5 py-[9px] absolute top-[1px] z-0 ">
                                    <RiLockPasswordFill className="text-white text-2xl " />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="flex items-center gap-2 px-3 py-1 rounded-sm text-[#238C3D] bg-[#182722] hover:text-white hover:bg-green-600 ">Change Password<FaFileInvoice /></button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default Settings;