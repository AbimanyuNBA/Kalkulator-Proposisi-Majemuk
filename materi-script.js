// Navigation between materi sections
document.addEventListener('DOMContentLoaded', function() {
    // Get all materi links
    const materiLinks = document.querySelectorAll('.materi-link');
    const materiSections = document.querySelectorAll('.materi-section');
    
    // Set first section as active by default
    if (materiSections.length > 0) {
        materiSections[0].classList.add('active');
    }
    if (materiLinks.length > 0) {
        materiLinks[0].classList.add('active');
    }
    
    // Add click event listeners to navigation links
    materiLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section id
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active link
            materiLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            materiSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    
                    // Smooth scroll to section
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
    
    // Auto-scroll to section from URL hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`.materi-link[href="#${targetId}"]`);
        
        if (targetSection && targetLink) {
            materiSections.forEach(s => s.classList.remove('active'));
            materiLinks.forEach(l => l.classList.remove('active'));
            
            targetSection.classList.add('active');
            targetLink.classList.add('active');
            
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
    
    // Add interactive examples
    addInteractiveExamples();
});

// Function to add interactive examples to materi
function addInteractiveExamples() {
    // Example: Interactive truth table for conjunction
    const conjunctionSection = document.getElementById('konjungsi');
    if (conjunctionSection) {
        addInteractiveTruthTable(conjunctionSection, '∧');
    }
    
    // Example: Interactive truth table for disjunction
    const disjunctionSection = document.getElementById('disjungsi');
    if (disjunctionSection) {
        addInteractiveTruthTable(disjunctionSection, '∨');
    }
}

// Function to add interactive truth table
function addInteractiveTruthTable(section, operator) {
    // Check if section has a truth table
    const table = section.querySelector('.truth-table');
    if (!table) return;
    
    // Add interactive controls
    const tableContainer = table.closest('.table-container');
    const interactiveDiv = document.createElement('div');
    interactiveDiv.className = 'interactive-controls';
    interactiveDiv.innerHTML = `
        <div class="input-controls">
            <h5>Coba Nilai p dan q:</h5>
            <div class="boolean-controls">
                <div class="control-group">
                    <label>p:</label>
                    <div class="toggle-buttons">
                        <button class="toggle-btn true-btn active" data-value="true">Benar</button>
                        <button class="toggle-btn false-btn" data-value="false">Salah</button>
                    </div>
                </div>
                <div class="control-group">
                    <label>q:</label>
                    <div class="toggle-buttons">
                        <button class="toggle-btn true-btn active" data-value="true">Benar</button>
                        <button class="toggle-btn false-btn" data-value="false">Salah</button>
                    </div>
                </div>
            </div>
            <div class="result-display">
                <p>Hasil: <span class="result-value">${getOperatorResult(true, true, operator)}</span></p>
            </div>
        </div>
    `;
    
    tableContainer.parentNode.insertBefore(interactiveDiv, tableContainer.nextSibling);
    
    // Add styling for interactive controls
    const style = document.createElement('style');
    style.textContent = `
        .interactive-controls {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            border: 2px solid #e1e5eb;
        }
        .input-controls h5 {
            margin-bottom: 15px;
            color: #2c3e50;
            font-size: 18px;
        }
        .boolean-controls {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }
        .control-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .control-group label {
            font-weight: 600;
            color: #4a5568;
        }
        .toggle-buttons {
            display: flex;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid #ddd;
        }
        .toggle-btn {
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            flex: 1;
        }
        .toggle-btn.true-btn {
            background: #f8f9fa;
            color: #27ae60;
        }
        .toggle-btn.false-btn {
            background: #f8f9fa;
            color: #e74c3c;
        }
        .toggle-btn.active {
            background: #FF801A;
            color: white;
        }
        .result-display {
            font-size: 18px;
            font-weight: 600;
            margin-top: 15px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            text-align: center;
        }
        .result-value {
            color: #FF801A;
            font-size: 20px;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners to toggle buttons
    interactiveDiv.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update result
            updateResult();
        });
    });
    
    function updateResult() {
        const pValue = interactiveDiv.querySelector('.control-group:first-child .toggle-btn.active').dataset.value === 'true';
        const qValue = interactiveDiv.querySelector('.control-group:nth-child(2) .toggle-btn.active').dataset.value === 'true';
        const result = getOperatorResult(pValue, qValue, operator);
        
        interactiveDiv.querySelector('.result-value').textContent = result;
    }
    
    function getOperatorResult(p, q, op) {
        switch(op) {
            case '∧': return p && q ? 'Benar' : 'Salah';
            case '∨': return p || q ? 'Benar' : 'Salah';
            case '→': return (!p || q) ? 'Benar' : 'Salah';
            case '↔': return p === q ? 'Benar' : 'Salah';
            default: return 'Error';
        }
    }
}