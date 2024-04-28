#include <iostream>
#include <filesystem>
#include <string>
#include <fstream>
#include <algorithm>
#include <map>
#include <regex>
#include <iostream>
#include <string.h>

#include <filesystem>
#include <fstream>
#include <algorithm>
#include <map>
#include <regex>
#include <iomanip>
#include <ctime>
#include <list>

std::string &ltrim(std::string &s)
{
  auto it = std::find_if(s.begin(), s.end(), [](char c)
                         { return !std::isspace<char>(c, std::locale::classic()); });
  s.erase(s.begin(), it);
  return s;
}
std::string &rtrim(std::string &s)
{
  auto it = std::find_if(s.rbegin(), s.rend(), [](char c)
                         { return !std::isspace<char>(c, std::locale::classic()); });
  s.erase(it.base(), s.end());
  return s;
}
std::string &trim(std::string &s)
{
  s = std::regex_replace(s, std::regex("\\r\\n|\\r|\\n"), "");
  return ltrim(rtrim(s));
}

int main(int argc, char *argv[])
{
  std::ifstream ifs;
  std::string str;
  std::string key, valStr;
  float val;

  std::string pathToFile = "./gh_dach_consumption_01_03_2024_00h__01_04_2024_00h.csv";

  ifs.open(pathToFile, std::ios::in);

  if (ifs)
  {
    while (!ifs.eof())
    {
      key = "";
      valStr = "";
      val = 0.0;

      std::getline(ifs, str);
      str = trim(str);
      const std::regex regex_verbrauch(".*Verbrauch.*");
      const std::regex regex_zeitwh(".*Zeit, Wh.*");
      if (str.length() > 0 && str.compare(" Verbrauch") != 0 && str.compare("Zeit, Wh") != 0 && !std::regex_match(str, regex_verbrauch) && !std::regex_match(str, regex_zeitwh))
      {
        std::stringstream ss(str);
        std::getline(ss, key, ' ');
        key = trim(key);

        std::cout << "trim:-" << key << "-" << std::endl;

        const std::regex regex_yyyymmdd("([\\d]){2}/([\\d]){2}/(\\d){4}");
        if (std::regex_match(key, regex_yyyymmdd))
        {
          std::cout << "key: " << key << std::endl;
          std::string day = "";
          std::string month = "";
          std::string year = "";

          std::stringstream ss(key);
          std::getline(ss, day, '/');
          std::getline(ss, month, '/');
          std::getline(ss, year, '/');

          std::cout << "Y-M-d: " << year << "-" << month << "-" << day << std::endl;

          std::cout << "str: " << str << std::endl;
          std::stringstream sa(str);
          while (std::getline(sa, valStr, ' '))
          {
            std::cout << "valStr: " << valStr << std::endl;
          }
          valStr = trim(valStr);
          val = std::stof(valStr);
          std::cout << "val: " << val << std::endl;
        }
      }
    }
    ifs.close();
  }
}
