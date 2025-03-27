
import React from 'react';

const IoTWaterContent = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold mb-2">The Problem: A Time-Consuming & Inefficient System</h3>
        <p>
          Imagine being a cattle farmer who needs to manually fill water tanks every day. You wake up early, measure feed and water levels by hand, and manually mix nutrients.
        </p>
        <p>
          Now imagine this:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-3">
          <li>You forget to refill a tank – and your cattle go thirsty.</li>
          <li>You mix nutrients incorrectly – leading to malnutrition.</li>
          <li>You waste water – overflowing tanks, increasing costs.</li>
        </ul>
        <p>
          For years, farmers have relied on manual labor and experience to manage water and nutrient distribution. But this method is inefficient, prone to human error, and costly.
        </p>
        <p>
          That's where IoT automation changes everything.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">The Solution: A Smart, Automated Feeding System</h3>
        <p>
          What if water tanks filled themselves automatically?
          What if nutrients were precisely measured and mixed for optimal cattle health?
          What if farmers could track everything from a mobile app?
        </p>
        <p>
          This idea became The Integrated IoT Water Management & Nutrient Delivery System—a smart farming solution that optimizes water and feed supply with zero manual effort.
        </p>
        <div className="bg-secondary/30 p-4 rounded-lg my-4">
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <span className="text-accent mr-2">✅</span>
              <span>Automated water level control</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✅</span>
              <span>Nutrient mixing and dispensing</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✅</span>
              <span>Real-time monitoring via a mobile app</span>
            </li>
          </ul>
        </div>
        <p>
          No more guessing. No more waste. Just efficient, data-driven farming.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">How It Works: A Fully Automated Process</h3>
        
        <div className="space-y-4 mt-3">
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold flex items-center"><span className="text-accent mr-2">📡</span> Step 1: Real-Time Water Monitoring</h4>
            <div className="ml-6 mt-2 space-y-2">
              <p>Sensors track water levels in feeder tanks.</p>
              <p>Automated valves open/close as needed—preventing overflows and shortages.</p>
            </div>
          </div>
          
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold flex items-center"><span className="text-accent mr-2">🥩</span> Step 2: Smart Nutrient Dispensing</h4>
            <div className="ml-6 mt-2 space-y-2">
              <p>The system calculates the exact dosage based on cattle feeding schedules.</p>
              <p>A DC motor-powered mixer ensures even nutrient distribution.</p>
            </div>
          </div>
          
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold flex items-center"><span className="text-accent mr-2">📲</span> Step 3: Remote Monitoring & Alerts</h4>
            <div className="ml-6 mt-2 space-y-2">
              <p>The farmer receives live updates on water and feeding conditions via the Blynk app.</p>
              <p>Alerts notify low water levels, ensuring proactive farm management.</p>
            </div>
          </div>
        </div>
        
        <p className="mt-3">
          By automating these critical processes, the system reduces manual work, improves feeding accuracy, and enhances livestock health.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">What We Measured & Improved</h3>
        
        <div className="mt-4 space-y-6">
          <div>
            <h4 className="font-semibold flex items-center"><span className="text-accent mr-2">📊</span> Water Efficiency</h4>
            <div className="ml-6 mt-2 space-y-2">
              <p><span className="italic">Before automation:</span> 20% of water was wasted due to spills and overflows.</p>
              <p><span className="italic">After automation:</span> Water waste reduced by 85% through precise control.</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold flex items-center"><span className="text-accent mr-2">🥩</span> Cattle Nutrition & Health</h4>
            <div className="ml-6 mt-2 space-y-2">
              <p><span className="italic">Before:</span> Inconsistent feeding schedules led to nutrient deficiencies.</p>
              <p><span className="italic">After:</span> Automated nutrient delivery ensured optimal cattle growth and well-being.</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold flex items-center"><span className="text-accent mr-2">⏳</span> Farmer Productivity</h4>
            <div className="ml-6 mt-2 space-y-2">
              <p>Manual labor reduced by 60%, allowing farmers to focus on other tasks.</p>
              <p>24/7 remote monitoring enabled real-time farm management.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Why This Project Matters</h3>
        <div className="space-y-2 mt-3">
          <p><span className="text-accent">🌍</span> <span className="font-semibold">Sustainability:</span> Reducing water waste benefits both farmers and the environment.</p>
          <p><span className="text-accent">🚜</span> <span className="font-semibold">Efficiency:</span> Automation frees farmers from repetitive tasks, letting them focus on bigger goals.</p>
          <p><span className="text-accent">📊</span> <span className="font-semibold">Data-Driven Decisions:</span> Smart analytics help optimize farm operations for maximum productivity.</p>
        </div>
        <p className="mt-4">
          This isn't just about technology—it's about changing the future of agriculture.
        </p>
        <p className="mt-2">
          And that's why this project matters. 🚀
        </p>
      </section>
    </div>
  );
};

export default IoTWaterContent;
