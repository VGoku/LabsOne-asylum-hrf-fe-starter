import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import {decodeBase64} from '../../../utils/decodeBase64.js';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  const handleReadMore = () => {
    // TODO: navigate to the humanrightsfirst.org homepage
    window.open("https://www.humanrightsfirst.org", "_blank");
  };

  return (
    <>
     {/* Title */}
     <div className="w-full bg-[#666555] py-6 px-4 text-center text-white -mt-6 z-10 relative">
      <h1 className="text-3xl font-semibold mb-2">Asylum Office Grant Rate Tracker</h1>
      <p className="max-w-1xl mx-auto text-sm">
        The Asylum Office Grant Rate Tracker provides advocates, attorneys, policymakers, and the public a way to explore USCIS data on Asylum Office decisions.
      </p>
     </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-4 py-10 font-sans text-gray-800">
      {/* Graph Cards */}
      <section className="flex flex-wrap justify-between gap-6 mb-12 text-center">
        <div className="flex-1 min-w-[200px]">
          <img src={barGraph} alt="Bar Graph" className="h-40 mx-auto mb-2" />
          <p className="text-sm">Search Grant Rates By Office</p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <img src={pieChart} alt="Pie Chart" className="h-40 mx-auto mb-2" />
          <p className="text-sm">Search Grant Rates By Nationality</p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <img src={lineGraph} alt="Line Graph" className="h-40 mx-auto mb-2" />
          <p className="text-sm">Search Grant Rates Over Time</p>
        </div>
      </section>

      {/* CTA Buttons */}
      <div className="text-center mb-16">
        <button
          onClick={() => navigate('/graphs')}
          className="bg-gray-700 text-white px-6 py-2 rounded mr-3 hover:bg-gray-800"
        >
          View the Data
        </button>
        <button
          onClick={downloadCSV}
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Download the Data
        </button>
      </div>

      {/* Info Section */}
      <section className="flex flex-wrap items-center gap-6 mb-16">
        <img
          src={paperStack}
          alt="Paper Stack"
          className="w-full md:w-1/2 max-w-md rounded"
        />
        <div className="flex-1">
          <p className="mb-4 text-base">
            Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and 2022 from the USCIS asylum offices, which we received through a Freedom of Information Act request.
          </p>
          <p className="mb-4 text-base">
            You can search the information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
          </p>
        </div>
      </section>

      {/* Disparity Insights */}
      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-6">Systemic Disparity Insights</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-64">
            <h3 className="text-xl font-bold mb-1">36%</h3>
            <p className="text-sm">
              By the end of the Trump administration, the average asylum office grant rate had fallen 36% from 2016 to 2020.
            </p>
          </div>
          <div className="w-64">
            <h3 className="text-xl font-bold mb-1">5%</h3>
            <p className="text-sm">
              The New York asylum office grant rate dropped to 5% in fiscal year 2020.
            </p>
          </div>
          <div className="w-64">
            <h3 className="text-xl font-bold mb-1">6x Lower</h3>
            <p className="text-sm">
              From 2017–2020, New York's grant rate was 6x lower than San Francisco's office.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mb-10">
        <div className="mb-4">
          <button
            onClick={handleReadMore}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Read More
          </button>
        </div>
        <div>
          <button
            onClick={scrollToTop}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Back to Top
          </button>
        </div>
      </footer>

    {/* // <div className='flex-c w-[100vw] secondary-c'>
    //   Landing Page
    //   <div>{'Type this into Canvas: ' + decodeBase64('VGltZTJDb2RlIQ==')}</div>
    // </div> */}
    </div>
    </>
  );
};
