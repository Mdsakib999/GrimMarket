/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { TbReload } from 'react-icons/tb';

const CaptchaComponent = ({ setIsCaptchaValid }) => {
    const [captchaText, setCaptchaText] = useState(''); // State to hold CAPTCHA text
    const [userInput, setUserInput] = useState('');     // State to hold user input
    const canvasRef = useRef(null);                     // Reference to the canvas element

    // Effect to initialize the CAPTCHA when the component is first rendered
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
    }, []);

    // Helper function to generate a random character (uppercase, lowercase, number)
    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

    // Function to generate CAPTCHA text randomly
    // Function to generate CAPTCHA text randomly with 5 characters
    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 2; i++) {
            captcha += generateRandomChar(65, 90); // 2 Uppercase letters
        }
        for (let i = 0; i < 2; i++) {
            captcha += generateRandomChar(97, 122); // 2 Lowercase letters
        }
        captcha += generateRandomChar(48, 57); // 1 Number

        // Shuffle characters and return the string (Total 5 characters)
        return captcha.split('').sort(() => Math.random() - 0.5).join('');
    };


    // Function to draw CAPTCHA text on the canvas
    // Function to draw CAPTCHA text on the canvas and center it
    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)']; // Random text colors

        // Set font and alignment
        ctx.font = '24px Roboto Mono'; // Font style
        ctx.textBaseline = 'middle';   // Align text vertically to the middle
        ctx.textAlign = 'center';      // Align text horizontally to the center

        // Calculate the center position of the canvas
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        // Draw the CAPTCHA text centered on the canvas
        ctx.fillStyle = textColors[Math.floor(Math.random() * textColors.length)]; // Random color
        ctx.fillText(captcha, centerX, centerY); // Draw text centered at (centerX, centerY)
    };


    // Function to initialize or regenerate CAPTCHA
    const initializeCaptcha = (ctx) => {
        setUserInput('');             // Reset user input
        setIsCaptchaValid(false);     // Reset validation state
        const newCaptcha = generateCaptchaText(); // Generate new CAPTCHA text
        setCaptchaText(newCaptcha);   // Set the new CAPTCHA text
        drawCaptchaOnCanvas(ctx, newCaptcha); // Draw new CAPTCHA on the canvas
    };

    // Handle user input and validate against CAPTCHA text
    const handleUserInputChange = (e) => {
        const value = e.target.value;
        setUserInput(value);

        // Validate CAPTCHA: if input matches the generated CAPTCHA, mark as valid
        if (value === captchaText) {
            setIsCaptchaValid(true);  // CAPTCHA is valid
        } else {
            setIsCaptchaValid(false); // CAPTCHA is invalid
        }
    };

    return (
        <div className="w-full">
            {/* CAPTCHA display section with reload button */}
            <div className="border flex items-center gap-3 border-gray-300 rounded-md p-2 shadow-lg mb-4 ">
                <canvas
                    ref={canvasRef}
                    height="45"
                    className="bg-gray-100 flex-1  rounded-md"
                ></canvas>
                <span
                    className="cursor-pointer"
                    onClick={() =>
                        initializeCaptcha(canvasRef.current.getContext('2d'))
                    }
                >
                    <TbReload size={20} />
                </span>
            </div>

            {/* Input field for user to enter CAPTCHA text */}
            <input
                type="text"
                placeholder="Enter the text shown above"
                value={userInput}
                onChange={handleUserInputChange}
                className="border border-gray-300 text-black rounded-md px-4 py-2 w-full mb-1"
            />
        </div>
    );
};

export default CaptchaComponent;
