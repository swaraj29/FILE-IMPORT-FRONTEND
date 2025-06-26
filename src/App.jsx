import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataPreview from './components/DataPreview';
import FieldMapping from './components/FieldMapping';
import DeduplicatedView from './components/DeduplicatedView';

const App = () => {
  const [step, setStep] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleFullClose = () => {
    setStep(0);
    setSelectedRowData(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6">
      {step === 0 && (
        <FileUpload onUploadComplete={(val) =>
          val === 'close' ? handleFullClose() : setStep(1)
        } />
      )}
      {step === 1 && (
        <DataPreview
          onNext={(rowData) => {
            setSelectedRowData(rowData);
            setStep(2);
          }}
          onExit={handleFullClose}
        />
      )}
      {step === 2 && (
        <FieldMapping
          onComplete={() => setStep(3)}
          exampleValues={selectedRowData}
        />
      )}
      {step === 3 && <DeduplicatedView />}
    </div>
  );
};

export default App;
