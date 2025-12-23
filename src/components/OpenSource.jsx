import React, { useState, useEffect } from "react";
import { DiGitMerge, DiGitPullRequest } from "react-icons/di";
import { AiFillApi } from "react-icons/ai";
import { motion } from "framer-motion";
import { fetchContributionsWithRetry } from "../lib/helperFunctions";
import styles from "../style";

const Contribution = (props) => {
  return (
    <motion.div
      className="flex flex-col justify-between p-6 rounded-[20px] bg-white border border-gray-200 h-full hover:border-secondary/50 transition-colors duration-300"
      whileInView={{ y: [20, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-start">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
            <img
            src={props.logoUrl}
            alt={props.organization}
            className="w-full h-full object-cover"
            />
        </div>
        <div className="flex flex-col ml-4 flex-1">
          <a
            className="font-poppins font-medium text-[16px] text-primary hover:text-secondary transition-colors leading-[24px] line-clamp-2"
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.title}
          </a>
          <div className="flex items-center mt-2">
             <span className="font-poppins text-[12px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                {props.organization}/{props.repo}
             </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <a
          className="flex items-center gap-2 font-poppins font-normal text-[13px] text-gray-600 hover:text-secondary transition-colors"
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.status === "MERGED" ? (
            <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                <DiGitMerge size="1.2rem" />
                <span>Merged</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <DiGitPullRequest size="1.2rem" />
                <span>Open</span>
            </div>
          )}
          <span className="text-gray-400">#{props.number}</span>
        </a>
        {props.linesAdded ? (
          <div className="font-poppins font-normal text-[13px] flex gap-2">
            <span className="text-green-600">+{props.linesAdded}</span>
            <span className="text-red-500">-{props.linesDeleted}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
};

const OpenSource = () => {
  const [contributions, setContributions] = useState([]);
  const [filterContribution, setFilterContribution] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filters, setFilters] = useState(["All"]);

  useEffect(() => {
    const getContributions = async () => {
      const fetchedContributions = await fetchContributionsWithRetry();
      setContributions(fetchedContributions);
      setFilterContribution(fetchedContributions);

      // Filters based on fetched contributions
      if (!fetchedContributions.error) {
        const uniqueRepos = [...new Set(fetchedContributions.map(c => c.repo))];
        setFilters(["All", ...uniqueRepos]);
      }
    };

    getContributions();
  }, []);

  const handleContributionFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {
      if (item === "All") {
        setFilterContribution(contributions);
      } else {
        setFilterContribution(
          contributions.filter(
            (contribution) => contribution.repo.toLowerCase() == item.toLowerCase()
          )
        );
      }
    }, 500);
  };

  return (
    <section id="openSource">
      <h1 className={`${styles.heading2} text-center`}>
        Open Source Contributions
      </h1>

      <div className="container px-2 py-5 mx-auto mb-8">
        <div className="flex items-center justify-center mb-8">
          {!contributions.error && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-1">
              {filters.map(
                (item, index) => (
                  <button
                    key={index}
                    onClick={() => handleContributionFilter(item)}
                    className={`px-4 py-2 text-sm font-normal rounded-full transition-all duration-300 focus:outline-none font-poppins ${
                      activeFilter === item 
                      ? "bg-secondary text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
        {contributions.error ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <AiFillApi
              size="3rem"
              className="text-gray-400 mb-4"
            />
            <h1 className="text-xl font-semibold font-poppins text-gray-700 md:text-2xl">
                Unable to load contributions
            </h1>
            <p className="font-poppins font-normal text-gray-500 mt-2 max-w-md">
                We encountered an issue while fetching the data. Please try reloading the page in a few moments.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filterContribution.map((contribution, index) => (
              <Contribution
                key={contribution.id}
                index={index}
                {...contribution}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenSource;
