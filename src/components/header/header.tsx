import type React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <h1 className="flex justify-center font-bold text-5xl">RoS Farm Guide</h1>
      <p className="text-xl">
        Denna guide ska ses som en rekommendation för att klara guild-events på
        bästa sätt.
      </p>
      <p className="text-xl">
        Vi har inte tagit hänsyn till skepp men här är vår rekommendation:
      </p>
      <ul className="list-disc list-inside text-xl">
        <li>
          Gå för Executor tidigt. Helt okej att låsa upp den före er första GL.
        </li>
        <li>Farma upp Malevolance till 7* före ni farmar upp Negotioator.</li>
      </ul>
    </div>
  );
};

export default Header;
