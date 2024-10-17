import { BsPersonAdd } from "react-icons/bs";
import UtilsComponents from "../../Components/UtilsComponensts/UtilsComponents";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetMeQuery } from "../../Redux/Features/Auth/authApi";

const Referrals = () => {
    const { userName } = useSelector((state) => state.auth)
    const { data, isLoading } = useGetMeQuery(undefined, { skip: !userName, refetchOnFocus: true })
    const secretRef = data?.data._id
    const [copyText, setCopyText] = useState('');

    // Update the referral link when `secretRef` is available
    useEffect(() => {
        if (secretRef) {
            const ref = btoa(secretRef)
            setCopyText(`https://silent-market.com/register?ref=${ref}`);
        }
    }, [secretRef]);
    const handleCopyText = (e) => {
        setCopyText(e.target.value);
    };

    const copyToClipboard = () => {
        copy(copyText);
        toast.success('Text Cope')
    };
    return (
        <div className="overflow-hidden">
            <div className="w-full">
                <UtilsComponents title={'Referrals'} description={"Here you can see your referrals"} />
            </div>
            <div className="border-2 border-dashed rounded-md py-5 mt-20 mx-4 border-[#238C3D] bg-[#202B27]">
                <p className="text-white text-center">Invite your friends via your referral link and get 2% of their deposits.</p>
            </div>
            <div className="flex flex-col md:flex-row mt-8">
                <div className="">
                    <div className=" mx-4 flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className=" flex gap-4">
                            <div className="bg-[#16191E] text-center p-8 rounded-md">
                                <BsPersonAdd className="text-7xl mx-auto text-[#206034]" />
                                <p className="py-2 text-lg font-semibold text-[#29A649]">0</p>
                                <p>Total of my referrals</p>
                            </div>
                            <div className="bg-[#16191E] text-center p-8 rounded-md">
                                <FaMoneyBillAlt className="text-7xl mx-auto text-[#206034]" />
                                <p className="py-2 text-lg font-semibold text-[#29A649]">$0.00</p>
                                <p>Earned total from referrals</p>
                            </div>
                        </div>

                    </div>
                    <div className="mt-4  mx-4  flex gap-3 bg-[#16191E] p-6 rounded-md">
                        <input onChange={handleCopyText} className="bg-transparent border w-full p-2 rounded-md border-[#238C3D] " type="text" value={copyText} />
                        <button onClick={copyToClipboard} className="bg-[#206034] hover:bg-[#238C3D] px-4 font-semibold rounded-md">Copy</button>
                    </div>
                </div>
                <div className="overflow-auto md:w-[70%] mt-5 md:mt-0">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700 text-left text-sm uppercase font-semibold tracking-wider">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Activity</th>
                                <th className="px-6 py-4">Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ? <div>Loading...</div>
                                    :
                                    data?.data?.ref?.map(item => <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-all">
                                        <td className="px-6 py-4">{item.userName}</td>
                                        <td className="px-6 py-4">Completed task</td>
                                        <td className="px-6 py-4">${item.dollar}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default Referrals;