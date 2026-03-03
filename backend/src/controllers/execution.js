import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/*
  Supported Languages:
  - javascript
  - python
*/

export const executeCode = async (req, res) => {
  const { code, language } = req.body;
  console.log("Request body:", req.body);

  if (!code || !language) {
    return res.status(400).json({
      success: false,
      error: "Code and language are required",
    });
  }

  // Unique filename to avoid conflicts
  const fileId = uuidv4();
  const baseDir = process.cwd();

  let filename;
  let command;

  try {
    // ======================
    // JAVASCRIPT EXECUTION
    // ======================
    if (language === "javascript") {
      filename = path.join(baseDir, `${fileId}.js`);
      fs.writeFileSync(filename, code);
      command = `node ${filename}`;
    }

    // ======================
    // PYTHON EXECUTION
    // ======================
    else if (language === "python") {
      filename = path.join(baseDir, `${fileId}.py`);
      fs.writeFileSync(filename, code);
      command = `python3 ${filename}`; // Use python3 on Render/Linux
    }

    else {
      return res.status(400).json({
        success: false,
        error: "Unsupported language",
      });
    }

    // ======================
    // EXECUTE WITH TIMEOUT
    // ======================
    exec(
      command,
      {
        timeout: 3000, // 3 seconds max
        maxBuffer: 1024 * 1024, // 1MB output limit
      },
      (error, stdout, stderr) => {
        // Always cleanup file
        if (filename && fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }

        if (error) {
          return res.json({
            success: false,
            error: stderr || error.message,
          });
        }

        return res.json({
          success: true,
          output: stdout,
        });
      }
    );
  } catch (err) {
    // Cleanup on crash
    if (filename && fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};