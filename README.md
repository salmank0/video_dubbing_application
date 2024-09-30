# Dubbing Interface Prototype

This project is a prototype of a mobile web-based dubbing interface, created as part of a Full Stack Developer test.

## How to Run the Application

1. Clone this repository:
   ```
   git clone https://github.com/your-username/dubbing-interface.git
   cd dubbing-interface
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Approach and Use of AI-Assisted Coding

This project was developed using Next.js 14 and leveraged AI-assisted coding to accelerate development. The AI assistant (Claude) was used to:

1. Generate the initial project structure and component files.
2. Provide implementations for key features such as video playback, audio recording, and dialogue navigation.
3. Ensure proper use of React hooks and Next.js best practices.
4. Implement responsive design using Tailwind CSS.

The developer's role was to:

1. Plan the overall architecture and component structure.
2. Review and refine the AI-generated code.
3. Integrate the components and ensure they work together seamlessly.
4. Test the application and make necessary adjustments.

## Challenges Faced and Solutions

1. **Challenge**: Implementing audio recording and playback.
   **Solution**: Used the Web Audio API and MediaRecorder to handle audio recording. Stored the recorded audio as a Blob and created an object URL for playback.

2. **Challenge**: Syncing recorded audio with video playback.
   **Solution**: Implemented a custom sync function that resets both video and audio to the beginning and plays them simultaneously.

3. **Challenge**: Responsive design for mobile and desktop.
   **Solution**: Utilized Tailwind CSS classes to create a mobile-first design that adapts well to larger screens.

## Potential Improvements

Given more time, the following improvements could be made:

1. Implement waveform visualization for the recorded audio.
2. Add offline functionality using local storage to save recording progress.
3. Implement user authentication for a more personalized experience.
4. Enhance error handling and add more comprehensive unit tests.
5. Optimize performance, especially for larger video files and longer recordings.

## Deployment

This application can be easily deployed using platforms like Vercel or Netlify. Simply connect your GitHub repository to these platforms, and they will automatically deploy your application with each push to the main branch.

