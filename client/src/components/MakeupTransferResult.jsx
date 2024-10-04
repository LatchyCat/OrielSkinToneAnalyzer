import React from 'react';

const MakeupTransferResult = ({ originalImage, makeupImage, resultImage }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Makeup Transfer Result</h2>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Original Image</h3>
          <img src={originalImage} alt="Original face" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Makeup Image</h3>
          <img src={makeupImage} alt="Makeup reference" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Result</h3>
          <img src={resultImage} alt="Makeup transfer result" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default MakeupTransferResult;
