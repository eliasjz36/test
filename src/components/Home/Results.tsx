import { utils } from "ethers";

const Results = ({
  etherspotAddresses,
  latestEstimationData,
  latestSendData,
}) => {
  return (
    //  beautiful result
    <div className="mt-10">
      {/*  if we have estimation data, show it */}
      {latestEstimationData && (
        <div>
          {/*  show the estimation data */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Estimation Data
            </h2>
            <p className="text-white">
              This is the data that was used to estimate the transaction.
            </p>

            <div className="mt-4 bg-gray-800 rounded-md p-4">
              <p className="text-gray-200">
                Cost:{" "}
                {utils.formatEther(
                  latestEstimationData[0]?.estimatedBatches[0]?.cost
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/*  if we have send data, show it */}
      {latestSendData && (
        <div className="mt-10">
          {/*  show the send data */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Your transaction was sent!
            </h2>
            <p className="text-white">
              Your transaction will appear here once it has been mined.
            </p>

            <div className="mt-4 bg-gray-800 rounded-md p-4">
              <a
                className="text-blue-400"
                target="_blank"
                href={`https://mumbai.polygonscan.com/address/${etherspotAddresses[0]?.address}#internaltx`}
              >
                Here!
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
