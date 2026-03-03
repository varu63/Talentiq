const API_BASE = import.meta.env.VITE_API_URL;

/**
 * @param {string} language
 * @param {string} code
 */
export async function executeCode(language, code) {
  try {
    const response = await fetch(`${API_BASE}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || "Execution failed",
      };
    }

    return {
      success: true,
      output: data.output || "No output",
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}