import moment from "moment";
import { useGetPostQuery } from "../../Redux/Features/Post/postApi";

const News = () => {
  const { data } = useGetPostQuery(undefined, { refetchOnMountOrArgChange: true })
  console.log(data);
  return (
    <div className="h-screen text-white bg-[#11131f] overflow-y-auto">
      <div className="w-full fixed top-[65px] bg-[#181c30] bg-opacity-95">
        <div className="flex items-center p-4">
          <p className="text-lg md:text-xl lg:text-2xl inline-block border-white">
            News
          </p>
          <span className="bg-white inline-block h-[40px] w-[3px] mx-5"></span>
          <p className="text-lg md:text-xl inline-block text-gray-400">
            Latest news from us
          </p>
        </div>
      </div>

      <div className="mt-[100px] p-5 space-y-6 text-gray-200">
        {
          data?.data.map((item, index) => <div key={index}>
            <div
              className="  py-4 "
              dangerouslySetInnerHTML={{ __html: item.postData }}
            />
            <div className="flex justify-between items-center border-b pb-2">
              <p> Crested: Admin</p>
              <p>
                {moment(item?.createdAt).isAfter(moment())
                  ? `${moment(item?.createdAt).fromNow(true)} left`
                  : `${moment(item?.createdAt).fromNow(true)} ago`}
              </p>

            </div>
          </div>)
        }

        {/* <p className="text-base md:text-lg">
          <span className="text-[#36fc46]">Bitcoin:</span> Bitcoin's price crosses the $30,000 mark, marking a significant milestone for crypto enthusiasts. Experts predict continued volatility.
        </p>
        <p className="text-base md:text-lg">
          <span className="text-[#36fc46]">Ethereum:</span> Ethereum 2.0 staking reaches record levels as the network moves closer to its full upgrade. Gas fees also see a dip.
        </p>
        <p className="text-base md:text-lg">
          <span className="text-[#36fc46]">Regulation:</span> Global regulators intensify their scrutiny of crypto exchanges. Some countries are moving toward adopting stricter rules for crypto trading.
        </p>

        <div className="flex space-x-5 mt-8">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
            Facebook
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600">
            LinkedIn
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default News;
