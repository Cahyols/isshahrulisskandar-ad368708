
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const SmartGroceryContent = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/10">Mobile App</Badge>
          <Badge variant="outline" className="bg-primary/10">React Native</Badge>
          <Badge variant="outline" className="bg-primary/10">Firebase</Badge>
          <Badge variant="outline" className="bg-primary/10">2025</Badge>
        </div>
        
        <h3 className="text-xl font-bold">Smart Grocery & Meal Planner</h3>
        <p>
          A comprehensive mobile application designed to help users manage their fridge inventory,
          plan meals, and generate grocery lists based on available ingredients. The app includes
          features for recipe suggestions, price comparison across Malaysian supermarkets, and budget tracking.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Goal</h4>
        <p>
          To build an app that helps users manage their fridge inventory, plan meals, and generate grocery lists
          based on available ingredients. The app suggests recipes, calculates missing ingredients, and allows
          users to track what they have, ultimately reducing food waste and saving money.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Core Features</h4>
        
        <div className="space-y-4">
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Inventory Management</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Input ingredients manually or via barcode scanner</li>
              <li>Save and update ingredient quantities</li>
              <li>Track expiry dates with notifications</li>
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Meal Suggestions</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Recipe suggestions based on available ingredients</li>
              <li>Visual indicators for available vs. missing ingredients</li>
              <li>Optimization to reduce waste and grocery needs</li>
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Smart Grocery List</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Auto-generated lists for missing ingredients</li>
              <li>Categorized by type (dairy, vegetables, etc.)</li>
              <li>Check-off functionality and carryover for unused items</li>
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Price Comparison (Future Feature)</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Compare prices across Malaysian supermarkets (Mydin, Aeon, Tesco)</li>
              <li>Highlight best deals and cheapest options</li>
              <li>Check availability and delivery options</li>
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Recipe Management</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Add custom recipes with ingredients, steps, and timing</li>
              <li>Integration with meal suggestion algorithm</li>
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Location-Based Support</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>View nearby supermarkets based on user location</li>
              <li>Display stock availability and delivery options</li>
            </ul>
          </div>
          
          <div className="bg-accent/5 p-4 rounded-md">
            <h5 className="font-medium mb-2">Budget Tracker (Future Feature)</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Track weekly/monthly grocery spending</li>
              <li>View usage statistics and spending patterns</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Technical Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 p-3 rounded-md">
            <span className="font-medium">Frontend:</span> React Native
          </div>
          <div className="bg-primary/5 p-3 rounded-md">
            <span className="font-medium">Backend:</span> Firebase/Node.js with Express
          </div>
          <div className="bg-primary/5 p-3 rounded-md">
            <span className="font-medium">Database:</span> Firestore/SQLite
          </div>
          <div className="bg-primary/5 p-3 rounded-md">
            <span className="font-medium">Barcode Scanning:</span> Zxing/React Native Camera
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">User Flow</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <span className="font-medium">Input Inventory:</span> Enter ingredients or scan items
          </li>
          <li>
            <span className="font-medium">Meal Suggestion:</span> View and select recipes based on inventory
          </li>
          <li>
            <span className="font-medium">Generate Grocery List:</span> Identify missing ingredients
          </li>
          <li>
            <span className="font-medium">Price Comparison:</span> Compare prices across selected supermarkets
          </li>
          <li>
            <span className="font-medium">Track & Repeat:</span> Monitor usage and receive new suggestions
          </li>
        </ol>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Development Timeline</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500 h-5 w-5" />
            <span>Phase 1: Basic Inventory and Meal Suggestion Features (1–2 months)</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="text-amber-500 h-5 w-5" />
            <span>Phase 2: Grocery List and Price Comparison Integration (2–3 months)</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="text-amber-500 h-5 w-5" />
            <span>Phase 3: Budget Tracker, User Profiles, and Notifications (2 months)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartGroceryContent;
