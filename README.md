# Baobab Insurance - Coding Challenge


## Our ambition

The recent developments in the cybersecurity landscape demonstrated a new wave of advanced cyber threats and techniques. A vast majority of the companies, and especially SMEs, were caught by surprise. This trend is reflected in many statistics, surveys, and observations. It also can be seen in the frequency and severity of cyber attacks over the past year.

At Baobab Insurance, we develop a new generation of cybersecurity insurance products, specifically designed for small and medium-sized businesses. We believe that only a holistic approach to cybersecurity and its deep integration with the best practices of risk management will not only reduce loss ratios significantly, but also deliver the best value for money to the customers. The essential part of our cyber insurance platform is an automated risk assessment which is based on the analysis of publicly accessible information about potential vulnerabilities of the company (DNS configuration, data leaks, open ports, etc.).


## Assignment

The goal of the assignment is to develop a simple tool for risk assessment by using the DNS configuration of a domain. A user should be able to specify a domain and get back its risk score. The risk score is calculated in the range between 0 (low risk) and 3 (high risk). The following assumptions should be used for the risk calculation:
* Usage of mature **email services** (e.g. GMail, Outlook, ProtonMail) lowers the risk
* DNS configuration with a **DMARC** record lowers the risk
* DNS configuration with an **SPF** record lowers the risk


The solution consists of 2 parts: Backend (TypeScript, Node) and Frontend (TypeScript, React)
1. **Frontend**: shows an input field for the domain, sends the entered domain to the backend API, consumes the response, and displays the risk
2. **Backend**: integrates with a 3rd-party API for DNS lookups, calculates the risk, and exposes an API for the risk calculation


Design and implement your solution using specified technologies. Make additional assumptions if necessary. The following questions should be addressed during the implementation: 
* Which 3rd-party API can be used for DNS lookups?
* How to calculate the risk score based on the DNS information?
* How to visualize the calculated risk score in the frontend?

We ask you to work no more than 3-4 hours on the assignment. Start using Git from the beginning and commit often with sensible messages (please use one repo for both, frontend and backend). You will demonstrate and discuss your solution in our next call. 

**Any content of your solution will remain confidential and will not be shared externally. We also ask you to not share your solution publicly.**

## We look forward to your result!
