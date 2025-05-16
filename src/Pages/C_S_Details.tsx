import React, { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import blogData, { CaseStudy } from "../assets/C_S_Data";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer/Footer";
// import NavBar from "@/components/common/NavBar";

const C_S_Details: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogData.find((blog) => blog.title === slug);

  if (!blog) {
    return <Navigate to="/404" />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Case Study - ${blog.title}`;
  }, [blog.title]);

  return (
    <>
      {/* <NavBar /> */}
      <div className="w-full bg-gray-100 mt-[90px] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-xl">
            <img 
              src={blog.imgUrl} 
              alt={blog.title} 
              className="w-full rounded-lg shadow-md"
              width={800}
              height={450}
            />
            <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>
            <p className="text-gray-600 text-lg mt-2">{blog.subTitle}</p>

            {/* Challenges Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Challenges</h2>
              <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-2">
                <li>{blog.challenges1}</li>
                {blog.challenges2 && <li>{blog.challenges2}</li>}
                {blog.challenges3 && <li>{blog.challenges3}</li>}
              </ul>
            </section>

            {/* Solution Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">How ClouSec Helped</h2>
              <div className="space-y-6 mt-3">
                {blog.details.map((detail, index) => (
                  <div key={index} className="p-5 bg-gray-50 border-l-4 border-blue-500 rounded-md shadow">
                    <h3 className="font-semibold text-lg text-gray-800">{detail.title}</h3>
                    <p className="text-gray-700 mt-1">{detail.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Results Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Results</h2>
              <div className="space-y-6 mt-3">
                {blog.results.map((result, index) => (
                  <div key={index} className="p-5 bg-green-50 border-l-4 border-green-500 rounded-md shadow">
                    <h3 className="font-semibold text-lg text-gray-800">{result.title}</h3>
                    <p className="text-gray-700 mt-1">{result.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Recent Case Studies</h3>
            <div className="space-y-4">
              {[...blogData].reverse().map((item: CaseStudy) => (
                <div key={item.id} className="flex gap-4 items-center border-b pb-4 last:border-b-0">
                  <img 
                    src={item.imgUrl} 
                    alt={item.title} 
                    className="w-16 h-16 object-cover rounded-lg shadow"
                    width={64}
                    height={64}
                  />
                  <Link 
                    to={`/blogs/${item.title}`} 
                    className="text-blue-600 font-semibold hover:underline"
                    aria-label={`Read case study about ${item.title}`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  );
};

export default C_S_Details;
