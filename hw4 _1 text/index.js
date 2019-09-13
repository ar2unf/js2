function change_quotes() {
    let source_text = document.getElementById('source').value;
    let all_quotes = /<!'|'(?![a-z]\b)/gm; // для всех одинарных кавычек за исключением апострафов
    let build_text  = source_text.replace(all_quotes, '"'); // меняем все
 
    document.getElementById('output').value = build_text; // 
}
document.getElementById('source').addEventListener('keyup', change_quotes);