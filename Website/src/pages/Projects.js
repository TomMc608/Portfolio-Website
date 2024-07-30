import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-section">
      <h2>Projects</h2>

      <section>
        <h3>Artificial Intelligence</h3>
        <div>
          <h4>Natural Language Processing (NLP)</h4>
          <p>
            This section includes projects related to natural language processing (NLP), which involves the interaction between computers and human language. Examples include:
          </p>
          <ul>
            <li>Sentiment Analysis Tools: Analyzing and extracting subjective information from text.</li>
            <li>Named Entity Recognition (NER): Identifying and classifying entities in text such as names, organizations, and locations.</li>
            <li>Text Summarization: Automatically generating concise summaries of longer documents.</li>
          </ul>
        </div>
        <div>
          <h4>Language Models</h4>
          <p>
            This section focuses on language models, which are designed to understand, generate, and manipulate language. Examples include:
          </p>
          <ul>
            <li>GPT-3: A transformer-based model for generating human-like text.</li>
            <li>BERT: A model designed for understanding the context of words in search queries.</li>
            <li>Language Translation Systems: Translating text from one language to another using models like Google Translate.</li>
          </ul>
        </div>
        <div>
          <h4>Conversational AI</h4>
          <p>
            This section highlights projects involving conversational AI, which creates systems capable of engaging in dialogue with humans. Examples include:
          </p>
          <ul>
            <li>Chatbots: Automated programs that can chat with users in natural language.</li>
            <li>Virtual Assistants: AI-powered assistants like Siri, Alexa, and Google Assistant.</li>
            <li>Dialogue Systems: Systems that can manage multi-turn conversations and context.</li>
          </ul>
        </div>
        <div>
          <h4>Image AI</h4>
          <p>
            This section showcases projects focused on computer vision, image recognition, and image generation. Examples include:
          </p>
          <ul>
            <li>Image Classifiers: Models that can classify images into different categories.</li>
            <li>Object Detection Systems: Identifying and locating objects within images or videos.</li>
            <li>Generative Adversarial Networks (GANs): Creating realistic images from scratch.</li>
          </ul>
        </div>
        <div>
          <h4>Other AI Projects</h4>
          <p>
            This section encompasses various other AI-related projects, including but not limited to:
          </p>
          <ul>
            <li>Reinforcement Learning: Training agents to make decisions through rewards and penalties.</li>
            <li>Predictive Analytics: Using data, statistical algorithms, and machine learning techniques to identify the likelihood of future outcomes.</li>
            <li>AI-Driven Automation: Automating repetitive tasks using AI, such as robotic process automation (RPA).</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Projects;
