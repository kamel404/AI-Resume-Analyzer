import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">App Data Management</h1>
                            <p className="text-gray-600 text-sm sm:text-base">Manage your application data and files</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg px-3 sm:px-4 py-2 mx-auto sm:mx-0 w-fit">
                            <p className="text-xs sm:text-sm font-medium text-blue-700 text-center sm:text-left">
                                Authenticated as: <span className="font-bold block sm:inline">{auth.user?.username}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Files Section */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Existing Files</h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {files.length > 0 
                                ? `You have ${files.length} file${files.length !== 1 ? 's' : ''} in your storage`
                                : 'No files found in your storage'
                            }
                        </p>
                    </div>
                    
                    {files.length > 0 ? (
                        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                            {files.map((file, index) => (
                                <div 
                                    key={file.id} 
                                    className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{file.name}</p>
                                            <p className="text-xs sm:text-sm text-gray-500">File #{index + 1}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 sm:py-12">
                            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-sm sm:text-base">No files to display</p>
                        </div>
                    )}
                </div>

                {/* Action Section */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
                    <div className="text-center">
                        <div className="mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Danger Zone</h3>
                            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2 sm:px-0">
                                This action will permanently delete all your files and clear the application cache. 
                                This cannot be undone.
                            </p>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 mx-2 sm:mx-0">
                            <div className="flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <p className="text-red-800 font-medium text-sm sm:text-base">
                                Warning: This action is irreversible!
                            </p>
                        </div>

                        <button
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 w-full sm:w-auto"
                            onClick={() => handleDelete()}
                            disabled={files.length === 0}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="text-sm sm:text-base">Wipe All App Data</span>
                            </div>
                        </button>
                        
                        {files.length === 0 && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">No data to wipe</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WipeApp;