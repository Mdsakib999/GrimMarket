import { BsPersonAdd } from "react-icons/bs";
import UtilsComponents from "../../Components/UtilsComponensts/UtilsComponents";

const Referrals = () => {
    return (
        <div>
            <div>
                <UtilsComponents title={'Referrals'} description={"Here you can see your referrals"} />
            </div>
            <div className="border-2 border-dashed rounded-md py-5 mt-36 mx-4 border-[#238C3D] bg-[#202B27]">
                <p className="text-white text-center">Invite your friends via your referral link and get 2% of their deposits.</p>
            </div>
            <div className="mt-8 mx-4 flex gap-4">
                <div className="w-[40%] flex gap-4">
                    <div className="bg-[#16191E] text-center p-8 rounded-md">
                        <BsPersonAdd className="text-7xl mx-auto text-[#206034]" />
                        <p className="py-2 text-lg font-semibold text-[#29A649]">0</p>
                        <p>Total of my referrals</p>
                    </div>
                    <div className="bg-[#16191E] text-center p-8 rounded-md">
                        <BsPersonAdd className="text-7xl mx-auto text-[#206034]" />
                        <p className="py-2 text-lg font-semibold text-[#29A649]">$0.00</p>
                        <p>Earned total from referrals</p>
                    </div>
                </div>
                <div className="w-[60%]">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700 text-left text-sm uppercase font-semibold tracking-wider">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Activity</th>
                                <th className="px-6 py-4">Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-700 hover:bg-gray-700 transition-all">
                                <td className="px-6 py-4">John Doe</td>
                                <td className="px-6 py-4">Completed task</td>
                                <td className="px-6 py-4">$120</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default Referrals;