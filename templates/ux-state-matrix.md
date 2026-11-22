# UX/state and AI-agent test matrix
| State | Human action | Accessible label/focus/status | Expected result | Tested device/browser | Evidence |
|---|---|---|---|---|---|
| Empty | Choose/upload | Named file input, descriptive hint | Ready to accept supported formats | | |
| Invalid | Upload corrupt/large | Clear field error and focus | Reject safely | | |
| Processing | Click process | Live progress + cancel control | Correct output or explain error | | |
| Complete | Download | Distinct named button, file facts in DOM | Verified file retrieved | | |
