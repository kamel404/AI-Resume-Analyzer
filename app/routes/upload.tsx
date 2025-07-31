import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/navbar'
import { usePuterStore } from '~/lib/puter';
import { convertPdfToImage } from '~/lib/pdfToimage';

const Upload = () => {

    const {auth, fs, isLoading, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyzeResume = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
        setIsProcessing(true);
        setStatusText('Analyzing your resume...');

        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Failed to upload file. Please try again.');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);

    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form');
        if (!form) return;

        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyzeResume({companyName, jobTitle, jobDescription, file});
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className='page-heading py-16'>
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="resume_scan" className='w-full' />
                        </>
                    ) : (
                        <>
                            <h2>Upload your resume</h2>
                            <p>Get your ATS score on your resume and improvements suggestions.</p>
                        </>
                    )}
                    {!isProcessing && (
                        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id="company-name" name="company-name" placeholder='Company Name' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id="job-title" name="job-title" placeholder='Job Title' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} id="job-description" name="job-description" placeholder='Job Description' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} selectedFile={file} />
                            </div>

                            <button className='primary-button' type='submit'>
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Upload;