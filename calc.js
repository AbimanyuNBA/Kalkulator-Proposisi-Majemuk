        document.addEventListener('DOMContentLoaded', function() {
            const operationSelect = document.getElementById('operation');
            const calculateButton = document.getElementById('calculate');
            const resultExpression = document.getElementById('result-expression');
            const resultValue = document.getElementById('result-value');
            const operationInfo = document.getElementById('operation-info');
            const operatorDesc = document.getElementById('operator-desc');
            const qOperand = document.getElementById('q-operand');
            const booleanOptions = document.querySelectorAll('.boolean-option');
            const truthTableBody = document.querySelector('#truth-table tbody');
            
            // Generate truth table ato tabel kebenaran
            function generateTruthTable() {
                const values = [true, false];
                let tableHTML = '';
                
                for (let p of values) {
                    for (let q of values) {
                        const negation = !p;
                        const conjunction = p && q;
                        const disjunction = p || q;
                        const exclusiveOr = (p || q) && !(p && q);
                        const implication = !p || q;
                        const biconditional = p === q;
                        
                        tableHTML += `
                            <tr>
                                <td>${p}</td>
                                <td>${q}</td>
                                <td>${negation}</td>
                                <td>${conjunction}</td>
                                <td>${disjunction}</td>
                                <td>${exclusiveOr}</td>
                                <td>${implication}</td>
                                <td>${biconditional}</td>
                            </tr>
                        `;
                    }
                }
                
                truthTableBody.innerHTML = tableHTML;
            }
            
            // Menyembunyikan input q untuk operasi khusus negasi
            function toggleQOperand() {
                if (operationSelect.value === 'negation') {
                    qOperand.style.display = 'none';
                } else {
                    qOperand.style.display = 'flex';
                }
                updateOperationInfo();
            }
            
            // Update informasi operasi
            function updateOperationInfo() {
                const operation = operationSelect.value;
                let info = '';
                let desc = '';
                
                switch(operation) {
                    case 'negation':
                        info = 'Negasi (¬p) membalik nilai kebenaran. Jika p benar, maka ¬p salah, dan sebaliknya.';
                        desc = 'Membalik nilai kebenaran';
                        break;
                    case 'conjunction':
                        info = 'Konjungsi (p ∧ q) benar hanya jika kedua proposisi benar.';
                        desc = 'Benar hanya jika keduanya benar';
                        break;
                    case 'disjunction':
                        info = 'Disjungsi (p ∨ q) benar jika salah satu proposisi benar.';
                        desc = 'Benar jika salah satu benar';
                        break;
                    case 'exclusiveOr':
                        info = 'Exclusive OR (p ⊕ q) benar jika hanya salah satu proposisi yang benar.';
                        desc = 'Benar jika hanya salah satu benar';
                        break;
                    case 'implication':
                        info = 'Implikasi (p → q) salah hanya jika p benar tetapi q salah.';
                        desc = 'Salah hanya jika p benar tapi q salah';
                        break;
                    case 'biconditional':
                        info = 'Biimplikasi (p ↔ q) benar jika kedua proposisi memiliki nilai kebenaran yang sama.';
                        desc = 'Benar jika p dan q sama';
                        break;
                }
                
                operationInfo.innerHTML = info;
                operatorDesc.textContent = desc;
            }
            
            // Event listener untuk perubahan operasi
            operationSelect.addEventListener('change', toggleQOperand);
            
            // Event listener untuk pilihan boolean
            booleanOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const parent = this.parentElement;
                    parent.querySelectorAll('.boolean-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });
            
            // Fungsi untuk mendapatkan nilai boolean dari elemen
            function getBooleanValue(container) {
                const selected = container.querySelector('.boolean-option.selected');
                return selected.getAttribute('data-value') === 'true';
            }
            
            // Fungsi untuk menghitung hasil
            function calculateResult() {
                const operation = operationSelect.value;
                const p = getBooleanValue(document.querySelector('.operand:first-child .boolean-select'));
                
                let result;
                let expression;
                
                switch(operation) {
                    case 'negation':
                        result = !p;
                        expression = `¬${p} = ${result}`;
                        break;
                    case 'conjunction':
                        const q1 = getBooleanValue(document.querySelector('#q-operand .boolean-select'));
                        result = p && q1;
                        expression = `${p} ∧ ${q1} = ${result}`;
                        break;
                    case 'disjunction':
                        const q2 = getBooleanValue(document.querySelector('#q-operand .boolean-select'));
                        result = p || q2;
                        expression = `${p} ∨ ${q2} = ${result}`;
                        break;
                    case 'exclusiveOr':
                        const q3 = getBooleanValue(document.querySelector('#q-operand .boolean-select'));
                        result = (p || q3) && !(p && q3);
                        expression = `${p} ⊕ ${q3} = ${result}`;
                        break;
                    case 'implication':
                        const q4 = getBooleanValue(document.querySelector('#q-operand .boolean-select'));
                        result = !p || q4;
                        expression = `${p} → ${q4} = ${result}`;
                        break;
                    case 'biconditional':
                        const q5 = getBooleanValue(document.querySelector('#q-operand .boolean-select'));
                        result = p === q5;
                        expression = `${p} ↔ ${q5} = ${result}`;
                        break;
                }
                
                // Tampilkan hasil
                resultExpression.textContent = expression;
                resultValue.textContent = result;
                resultValue.className = 'result-value ' + (result ? 'result-true' : 'result-false');
                
                highlightTruthTable(p, operation === 'negation' ? false : getBooleanValue(document.querySelector('#q-operand .boolean-select')), operation);
            }
            
            function highlightTruthTable(p, q, operation) {
                const rows = truthTableBody.querySelectorAll('tr');
                
                rows.forEach(row => {
                    row.classList.remove('highlight');
                    
                    const pValue = row.cells[0].textContent === 'true';
                    const qValue = row.cells[1].textContent === 'true';
                    
                    if (operation === 'negation') {
                        if (pValue === p) {
                            row.classList.add('highlight');
                        }
                    } else {
                        if (pValue === p && qValue === q) {
                            row.classList.add('highlight');
                        }
                    }
                });
            }
            
            // Event listener untuk tombol hitung
            calculateButton.addEventListener('click', calculateResult);
            
            // Inisialisasi
            toggleQOperand();
            generateTruthTable();
            
            // Hitung hasil pertama kali
            calculateResult();
        });
