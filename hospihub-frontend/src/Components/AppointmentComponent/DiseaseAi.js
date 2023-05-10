import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiseaseAi() {
  const baseUrl = 'http://localhost:5001';
  const [symptomList, setSymptomList] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [symptomInput, setSymptomInput] = useState('');

  useEffect(() => {
    async function fetchSymptomList() {
      try {
        const response = await axios.get(`${baseUrl}/symptom-list`);
        setSymptomList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSymptomList();
  }, []);

  const addSymptom = () => {
    if (symptomInput && !symptoms.includes(symptomInput)) {
      setSymptoms([...symptoms, symptomInput]);
      setSymptomInput('');
    }
  };

  const deleteSymptom = (index) => {
    setSymptoms([...symptoms.slice(0, index), ...symptoms.slice(index + 1)]);
  };

  const reset = () => {
    setSymptoms([]);
    setSymptomInput('');
    setDiagnosis(null);
  };

  const diagnose = async () => {
    try {
      const data = { symptoms };
      const response = await axios.post(`${baseUrl}/diagnose`, data);
      setDiagnosis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
          defer
        ></script>
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbar-brand mt-4 mb-4" style={{ fontSize: '40px' }}><b>Diseases Diagnosis</b></div>
          </div>
        </nav>

        <main className="container pt-4" style={{ paddingBottom: '80px' }}>
          <form>
            <label htmlFor="symptomInput" className="form-label">
              Select all your symptoms (only select from our data)
            </label>
            <input
              className="form-control"
              list="symptomsDatalist"
              id="symptomInput"
              name="symptomInput"
              placeholder="Type your symptoms..."
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
            />
            <datalist id="symptomsDatalist">
              {symptomList.map((symptom) => (
                <option key={symptom} value={symptom} />
              ))}
            </datalist>

            <button
            style={{ backgroundColor: 'green' }}
              type="button"
              id="add-symptom"
              name="add-symptom"
              className="btn btn-secondary mt-4 custom-button mr-3"
              onClick={addSymptom}
            >
              Add Symptom
            </button>
            <button
            style={{ backgroundColor: 'red' }}
              type="button"
              id="delete-symptom"
              name="delete-symptom"
              className="btn btn-secondary mt-4 custom-button mr-3"
              onClick={reset}
            >
              Delete Symptoms
            </button>

            <button
          type="button"
          id="diagnose"
          name="diagnose"
          className="btn btn-primary mt-4 custom-button mr-3"
          onClick={diagnose}
        >
          Diagnose
        </button>
      </form>

      <div className="mt-2" id="symptoms-box">
        {symptoms.map((symptom) => (
          <span
            key={symptom}
            className="badge rounded-pill bg-secondary me-1"
          >
            {symptom}
          </span>
        ))}
      </div>
      <p className="mt-4" id="diseases-title">
        {diagnosis ? "You probably have one of these diseases" : ""}
      </p>
      <div id="diseases-box">
        <ul className="list-group" style={{ display: diagnosis ? 'block' : 'none' }}>
          {diagnosis?.diseases.map((disease) => (
            <li key={disease.name} className="list-group-item">
              <h6>{disease.name}</h6>
              <p>{disease.description}</p>
              <p className="card-text">Precautions:</p>
              <ul id={`precaution-ul-${disease.name}`}>
                {disease.precautions.map((precaution) => (
                  <li key={precaution}>{precaution}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </main>
</body>
    <footer className="mt-4"></footer>
  </>
);
}

export default DiseaseAi;
