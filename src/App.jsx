import { useState, useCallback, useRef, useEffect } from "react";


function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);

  const passwordGenerator = useCallback(() => {
    var pass = "";
    var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) string += "0123456789";

    if (char) string += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(charIndex);
    }

    setPassword(pass);
  }, [numbers, char, length, setPassword]);

  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, char, passwordGenerator]);

  const copyToClip = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  return (
    <>
      <div className="w-full h-[100vh] bg-black">
        <div className="w-full h-full absolute">
          <img
            src="./hacker.jpeg"
            alt="Hacker"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="text-white relative w-full h-full">
          <div className="heading w-full h-full flex flex-col gap-20">
            
            <div className=" sm:max-w-[700px] max-w-[350px] bg-transparent mx-auto mt-10 rounded-md p-4 flex flex-col">
              <div className="flex items-start justify-around">
                <input
                  type="text"
                  placeholder="password"
                  className="w-[70%] h-[60px] outline-none rounded-l-md bg-gray-800"
                  value={password}
                  ref={passwordRef}
                />
                <button className="bg-blue-500 h-[60px] p-4 rounded-r-md"
                onClick={copyToClip}>
                  Copy
                </button>
              </div>
              <div className="flex sm:flex-row flex-col items-center gap-4 mt-7 justify-around">
                <input
                  className="bg-gray-800"
                  type="range"
                  min={8}
                  max={100}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label>length : {length}</label>

                <input
                  type="checkbox"
                  defaultChecked={numbers}
                  onChange={() => {
                    setNumbers((prev) => !prev);
                  }}
                />
                <label>Numbers</label>

                <input
                  type="checkbox"
                  defaultChecked={char}
                  onChange={() => {
                    setChar((prev) => !prev);
                  }}
                />
                <label>Char</label>
              </div>
            </div>

            <h1 className="w-full mx-auto text-4xl flex justify-center items-center">Password Generator</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
