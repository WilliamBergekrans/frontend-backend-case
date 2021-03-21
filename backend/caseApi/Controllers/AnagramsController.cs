using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

// Namespace
namespace Anagrams.Controllers
{
    // Routes
    [Route("[controller]")]
    [ApiController]
    public class AnagramsController : ControllerBase
    {
        // GET: "/list". 
        // Variables containsChar and minSetSize is stored in containsChar and minSetSize. 
        // Example of call is "/list?containsChar=abd". and "/list?containsChar=ad&minSetSize=3"
        [HttpGet("/list")]
        public string GetAnagramList(string containsChar, int minSetSize)
        {
            // Get all the words that contain the characters from the input. 
            // Time complex O(n)
            var posList = new List<string>();
            posList = getSortedWords(containsChar);

            // For every word in the list. Map it in a dictionary where the key 
            // is a sorted array of the string characters. In this way, every anagram 
            // gets the same key. The position of the word in the original list is then 
            // stored together with the key. 
            // Dictionary for storing anagrams
            var anagrams = new Dictionary<string, List<int>>();
            // Go through the list of possible anagram words to sort and map. 
            for (int i = 0; i < posList.Count; i++)
            {
                // Sort the characters in the word. 
                // This will act as the key in the dictionary. 
                char[] characters = posList[i].ToCharArray();
                Array.Sort(characters);
                string s = new string(characters);
                // Add to anagram dictionary 
                // the key is the ordered word. 
                // The data is the position in the original list. 
                if (anagrams.ContainsKey(s))
                {
                    anagrams[s].Add(i);
                }
                else
                {
                    anagrams.Add(s, new List<int> { i });
                }
            }

            // Create a variable to fill the real words into.
            var returnList = new List<List<string>>();

            // Go through the dictionary with the mapped values.
            // The keys that have more data than the input should be stored. 
            foreach (KeyValuePair<string, List<int>> entry in anagrams)
            {
                // Check if the length of the stored anagrams is greater than the 
                // wanted set size. Otherwise the set can be ignored. 
                if (entry.Value.Count() >= minSetSize)
                {
                    var list = new List<string>();
                    // Add all the entries in the original list using the position stored
                    // in the anagram list. 
                    foreach (int i in entry.Value)
                    {
                        // Add all the anagrams of a word to a list
                        list.Add(posList[i]);
                    }
                    // Add the list of anagrams to the return list 
                    returnList.Add(list);
                }
            }

            // Options to make the output more readable. 
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
            };
            // Jsonify the array of anagrams.
            var json = JsonSerializer.Serialize(returnList, options);
            // Return the JSON data. 
            return json;
        }

        // Method for loading data from text file. 
        // Returns a list where not possible strings (not containing correct characters)
        // are sorted out. 
        public List<string> getSortedWords(string chars)
        {
            // Init. a list for storing all the anagrams in. 
            var data = new List<string>();
            // Load the data from the relevant text file. 

            // Use StreamReader to read from text file. 
            using (StreamReader sr = new StreamReader("words.txt"))
            {
                // A variable to store words from the data in. 
                string word;
                // Read strings from the file until there are no more words to read. 
                while ((word = sr.ReadLine()) != null)
                {
                    // For every word. Check if the word includes the input characters. 
                    if (checkIfCharsInString(chars, word))
                    {
                        // Add the anagram word to the list that will be returned. 
                        data.Add(word);
                    }
                }
            }

            // Return the list of strings 
            return data;
        }

        // Method for checking if characters are present in a string.
        public Boolean checkIfCharsInString(string chars, string word)
        {
            // If there were no character given in input
            if (chars is null)
            {
                return true;
            }

            // Check that all characters in the input is present in the word. 
            foreach (char c in chars)
            {
                // If the word does not contain every char. Return false. 
                if (!word.Contains(c)) { return false; }
            }
            // If all the chars is in the word.
            // then true is returned. 
            return true;
        }
    }
}
