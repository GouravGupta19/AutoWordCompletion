class TrieNode{
    constructor(){
        this.children={};
        this.isEndOfWord=false;
    }
}

class Trie{
    constructor(){
        this.root=new TrieNode();
    }
    insert(word){
        let node=this.root;
        for(let ch of word){
            if(!node.children[ch]) {
                node.children[ch]=new TrieNode();
            }
            node=node.children[ch];
        }
        node.isEndOfWord=true;
    }
    search(prefix){
        let node=this.root;
        for(let ch of prefix) {
            if(!node.children[ch]) return [];
            node=node.children[ch];
        }
        return this.startsWith(node,prefix);
    }
    startsWith(node,prefix){
        let results=[];
        if(node.isEndOfWord) results.push(prefix);
        for(let ch in node.children) {
            results.push(...this.startsWith(node.children[ch],prefix+ch));
        }
        return results;
    }
}

const countries = [
    "Abkhazia", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
    "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya",
    "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "Niue", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russia",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
    "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Ossetia", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Transnistria", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Western Sahara", "Western Samoa", "Yemen", "Zambia", "Zimbabwe"
];

const trie=new Trie();
countries.forEach((country)=>trie.insert(country.toLowerCase()));
const searchInput=document.querySelector(`#search`);
const suggestionsList=document.querySelector(`#suggestions`);

searchInput.addEventListener("input",function(){
    const query=this.value.toLowerCase();
    suggestionsList.innerHTML="";
    if(query){
        const matches=trie.search(query);
        matches.forEach((match)=>{
            const li=document.createElement("li");
            li.textContent=match;
            li.addEventListener("click",()=>{
                window.location.href=`https://en.wikipedia.org/wiki/${match.replace(/ /g, "_")}`;
            });
            suggestionsList.appendChild(li);
        });
    }
});
