import { useState, useEffect } from 'react'
import * as ml5 from 'ml5'

import './App.css'
import tiger from './peakpx.jpeg'

export default function Ml5js() {
  const [predictions, setPredictions] = useState([])

  const classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded)
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!')
    }
    // Put the image to classify inside a variable
    const image = document.getElementById('image')
    // Make a prediction with a selected image
    classifier.classify(image, gotResult)

    // A function to run when we get any errors and the results
    function gotResult(error, results) {
      // Display error in the console
      if (error) {
        console.error(error)
      } else {
        // The results are in an array ordered by confidence.
        console.log(results)
        //createDiv(`Label: ${results[0].label}`)
        //createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`)
        setPredictions(results)
      }
    }
  }

  useEffect(() => {
    classifyImg()
  }, [])

  return (
    <div className="App">
      <h1>Image classification with ML5.js</h1>
      <img src={tiger} id="image" width="400" alt="" />
      {predictions.length > 0 ? (
        predictions.map((pred, i) => {
          let { label, confidence } = pred
          // round the probability with 2 decimal
          confidence = Math.floor(confidence * 10000) / 100 + '%'
          return (
            <div key={i + ''}>
              {i + 1}. Prediction: {label} at {confidence}{' '}
            </div>
          )
        })
      ) : (
        <div className="loader"></div>
      )}
    </div>
  )
}
