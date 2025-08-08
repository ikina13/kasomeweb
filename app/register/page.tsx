"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, User, School, Search, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export interface Country {
  name: string; country: string; code: string; iso: string; flag: string;
}

export const countries: Country[] = [
    { name: "Afghanistan", country: "AF", code: "+93", iso: "AFG", flag: "🇦🇫" }, { name: "Albania", country: "AL", code: "+355", iso: "ALB", flag: "🇦🇱" }, { name: "Algeria", country: "DZ", code: "+213", iso: "DZA", flag: "🇩🇿" }, { name: "Andorra", country: "AD", code: "+376", iso: "AND", flag: "🇦🇩" }, { name: "Angola", country: "AO", code: "+244", iso: "AGO", flag: "🇦🇴" }, { name: "Antigua and Barbuda", country: "AG", code: "+1-268", iso: "ATG", flag: "🇦🇬" }, { name: "Argentina", country: "AR", code: "+54", iso: "ARG", flag: "🇦🇷" }, { name: "Armenia", country: "AM", code: "+374", iso: "ARM", flag: "🇦🇲" }, { name: "Australia", country: "AU", code: "+61", iso: "AUS", flag: "🇦🇺" }, { name: "Austria", country: "AT", code: "+43", iso: "AUT", flag: "🇦🇹" }, { name: "Azerbaijan", country: "AZ", code: "+994", iso: "AZE", flag: "🇦🇿" }, { name: "Bahamas", country: "BS", code: "+1-242", iso: "BHS", flag: "🇧🇸" }, { name: "Bahrain", country: "BH", code: "+973", iso: "BHR", flag: "🇧🇭" }, { name: "Bangladesh", country: "BD", code: "+880", iso: "BGD", flag: "🇧🇩" }, { name: "Barbados", country: "BB", code: "+1-246", iso: "BRB", flag: "🇧🇧" }, { name: "Belarus", country: "BY", code: "+375", iso: "BLR", flag: "🇧🇾" }, { name: "Belgium", country: "BE", code: "+32", iso: "BEL", flag: "🇧🇪" }, { name: "Belize", country: "BZ", code: "+501", iso: "BLZ", flag: "🇧🇿" }, { name: "Benin", country: "BJ", code: "+229", iso: "BEN", flag: "🇧🇯" }, { name: "Bhutan", country: "BT", code: "+975", iso: "BTN", flag: "🇧🇹" }, { name: "Bolivia", country: "BO", code: "+591", iso: "BOL", flag: "🇧🇴" }, { name: "Bosnia and Herzegovina", country: "BA", code: "+387", iso: "BIH", flag: "🇧🇦" }, { name: "Botswana", country: "BW", code: "+267", iso: "BWA", flag: "🇧🇼" }, { name: "Brazil", country: "BR", code: "+55", iso: "BRA", flag: "🇧🇷" }, { name: "Brunei", country: "BN", code: "+673", iso: "BRN", flag: "🇧🇳" }, { name: "Bulgaria", country: "BG", code: "+359", iso: "BGR", flag: "🇧🇬" }, { name: "Burkina Faso", country: "BF", code: "+226", iso: "BFA", flag: "🇧🇫" }, { name: "Burundi", country: "BI", code: "+257", iso: "BDI", flag: "🇧🇮" }, { name: "Cambodia", country: "KH", code: "+855", iso: "KHM", flag: "🇰🇭" }, { name: "Cameroon", country: "CM", code: "+237", iso: "CMR", flag: "🇨🇲" }, { name: "Canada", country: "CA", code: "+1", iso: "CAN", flag: "🇨🇦" }, { name: "Cape Verde", country: "CV", code: "+238", iso: "CPV", flag: "🇨🇻" }, { name: "Central African Republic", country: "CF", code: "+236", iso: "CAF", flag: "🇨🇫" }, { name: "Chad", country: "TD", code: "+235", iso: "TCD", flag: "🇹🇩" }, { name: "Chile", country: "CL", code: "+56", iso: "CHL", flag: "🇨🇱" }, { name: "China", country: "CN", code: "+86", iso: "CHN", flag: "🇨🇳" }, { name: "Colombia", country: "CO", code: "+57", iso: "COL", flag: "🇨🇴" }, { name: "Comoros", country: "KM", code: "+269", iso: "COM", flag: "🇰🇲" }, { name: "Congo (DRC)", country: "CD", code: "+243", iso: "COD", flag: "🇨🇩" }, { name: "Congo (Republic)", country: "CG", code: "+242", iso: "COG", flag: "🇨🇬" }, { name: "Costa Rica", country: "CR", code: "+506", iso: "CRI", flag: "🇨🇷" }, { name: "Croatia", country: "HR", code: "+385", iso: "HRV", flag: "🇭🇷" }, { name: "Cuba", country: "CU", code: "+53", iso: "CUB", flag: "🇨🇺" }, { name: "Cyprus", country: "CY", code: "+357", iso: "CYP", flag: "🇨🇾" }, { name: "Czech Republic", country: "CZ", code: "+420", iso: "CZE", flag: "🇨🇿" }, { name: "Denmark", country: "DK", code: "+45", iso: "DNK", flag: "🇩🇰" }, { name: "Djibouti", country: "DJ", code: "+253", iso: "DJI", flag: "🇩🇯" }, { name: "Dominica", country: "DM", code: "+1-767", iso: "DMA", flag: "🇩🇲" }, { name: "Dominican Republic", country: "DO", code: "+1-809", iso: "DOM", flag: "🇩🇴" }, { name: "Ecuador", country: "EC", code: "+593", iso: "ECU", flag: "🇪🇨" }, { name: "Egypt", country: "EG", code: "+20", iso: "EGY", flag: "🇪🇬" }, { name: "El Salvador", country: "SV", code: "+503", iso: "SLV", flag: "🇸🇻" }, { name: "Equatorial Guinea", country: "GQ", code: "+240", iso: "GNQ", flag: "🇬🇶" }, { name: "Eritrea", country: "ER", code: "+291", iso: "ERI", flag: "🇪🇷" }, { name: "Estonia", country: "EE", code: "+372", iso: "EST", flag: "🇪🇪" }, { name: "Eswatini", country: "SZ", code: "+268", iso: "SWZ", flag: "🇸🇿" }, { name: "Ethiopia", country: "ET", code: "+251", iso: "ETH", flag: "🇪🇹" }, { name: "Fiji", country: "FJ", code: "+679", iso: "FJI", flag: "🇫🇯" }, { name: "Finland", country: "FI", code: "+358", iso: "FIN", flag: "🇫🇮" }, { name: "France", country: "FR", code: "+33", iso: "FRA", flag: "🇫🇷" }, { name: "Gabon", country: "GA", code: "+241", iso: "GAB", flag: "🇬🇦" }, { name: "Gambia", country: "GM", code: "+220", iso: "GMB", flag: "🇬🇲" }, { name: "Georgia", country: "GE", code: "+995", iso: "GEO", flag: "🇬🇪" }, { name: "Germany", country: "DE", code: "+49", iso: "DEU", flag: "🇩🇪" }, { name: "Ghana", country: "GH", code: "+233", iso: "GHA", flag: "🇬🇭" }, { name: "Greece", country: "GR", code: "+30", iso: "GRC", flag: "🇬🇷" }, { name: "Grenada", country: "GD", code: "+1-473", iso: "GRD", flag: "🇬🇩" }, { name: "Guatemala", country: "GT", code: "+502", iso: "GTM", flag: "🇬🇹" }, { name: "Guinea", country: "GN", code: "+224", iso: "GIN", flag: "🇬🇳" }, { name: "Guinea-Bissau", country: "GW", code: "+245", iso: "GNB", flag: "🇬🇼" }, { name: "Guyana", country: "GY", code: "+592", iso: "GUY", flag: "🇬🇾" }, { name: "Haiti", country: "HT", code: "+509", iso: "HTI", flag: "🇭🇹" }, { name: "Honduras", country: "HN", code: "+504", iso: "HND", flag: "🇭🇳" }, { name: "Hungary", country: "HU", code: "+36", iso: "HUN", flag: "🇭🇺" }, { name: "Iceland", country: "IS", code: "+354", iso: "ISL", flag: "🇮🇸" }, { name: "India", country: "IN", code: "+91", iso: "IND", flag: "🇮🇳" }, { name: "Indonesia", country: "ID", code: "+62", iso: "IDN", flag: "🇮🇩" }, { name: "Iran", country: "IR", code: "+98", iso: "IRN", flag: "🇮🇷" }, { name: "Iraq", country: "IQ", code: "+964", iso: "IRQ", flag: "🇮🇶" }, { name: "Ireland", country: "IE", code: "+353", iso: "IRL", flag: "🇮🇪" }, { name: "Israel", country: "IL", code: "+972", iso: "ISR", flag: "🇮🇱" }, { name: "Italy", country: "IT", code: "+39", iso: "ITA", flag: "🇮🇹" }, { name: "Ivory Coast", country: "CI", code: "+225", iso: "CIV", flag: "🇨🇮" }, { name: "Jamaica", country: "JM", code: "+1-876", iso: "JAM", flag: "🇯🇲" }, { name: "Japan", country: "JP", code: "+81", iso: "JPN", flag: "🇯🇵" }, { name: "Jordan", country: "JO", code: "+962", iso: "JOR", flag: "🇯🇴" }, { name: "Kazakhstan", country: "KZ", code: "+7", iso: "KAZ", flag: "🇰🇿" }, { name: "Kenya", country: "KE", code: "+254", iso: "KEN", flag: "🇰🇪" }, { name: "Kiribati", country: "KI", code: "+686", iso: "KIR", flag: "🇰🇮" }, { name: "Kuwait", country: "KW", code: "+965", iso: "KWT", flag: "🇰🇼" }, { name: "Kyrgyzstan", country: "KG", code: "+996", iso: "KGZ", flag: "🇰🇬" }, { name: "Laos", country: "LA", code: "+856", iso: "LAO", flag: "🇱🇦" }, { name: "Latvia", country: "LV", code: "+371", iso: "LVA", flag: "🇱🇻" }, { name: "Lebanon", country: "LB", code: "+961", iso: "LBN", flag: "🇱🇧" }, { name: "Lesotho", country: "LS", code: "+266", iso: "LSO", flag: "🇱🇸" }, { name: "Liberia", country: "LR", code: "+231", iso: "LBR", flag: "🇱🇷" }, { name: "Libya", country: "LY", code: "+218", iso: "LBY", flag: "🇱🇾" }, { name: "Liechtenstein", country: "LI", code: "+423", iso: "LIE", flag: "🇱🇮" }, { name: "Lithuania", country: "LT", code: "+370", iso: "LTU", flag: "🇱🇹" }, { name: "Luxembourg", country: "LU", code: "+352", iso: "LUX", flag: "🇱🇺" }, { name: "Madagascar", country: "MG", code: "+261", iso: "MDG", flag: "🇲🇬" }, { name: "Malawi", country: "MW", code: "+265", iso: "MWI", flag: "🇲🇼" }, { name: "Malaysia", country: "MY", code: "+60", iso: "MYS", flag: "🇲🇾" }, { name: "Maldives", country: "MV", code: "+960", iso: "MDV", flag: "🇲🇻" }, { name: "Mali", country: "ML", code: "+223", iso: "MLI", flag: "🇲🇱" }, { name: "Malta", country: "MT", code: "+356", iso: "MLT", flag: "🇲🇹" }, { name: "Marshall Islands", country: "MH", code: "+692", iso: "MHL", flag: "🇲🇭" }, { name: "Mauritania", country: "MR", code: "+222", iso: "MRT", flag: "🇲🇷" }, { name: "Mauritius", country: "MU", code: "+230", iso: "MUS", flag: "🇲🇺" }, { name: "Mexico", country: "MX", code: "+52", iso: "MEX", flag: "🇲🇽" }, { name: "Micronesia", country: "FM", code: "+691", iso: "FSM", flag: "🇫🇲" }, { name: "Moldova", country: "MD", code: "+373", iso: "MDA", flag: "🇲🇩" }, { name: "Monaco", country: "MC", code: "+377", iso: "MCO", flag: "🇲🇨" }, { name: "Mongolia", country: "MN", code: "+976", iso: "MNG", flag: "🇲🇳" }, { name: "Montenegro", country: "ME", code: "+382", iso: "MNE", flag: "🇲🇪" }, { name: "Morocco", country: "MA", code: "+212", iso: "MAR", flag: "🇲🇦" }, { name: "Mozambique", country: "MZ", code: "+258", iso: "MOZ", flag: "🇲🇿" }, { name: "Myanmar", country: "MM", code: "+95", iso: "MMR", flag: "🇲🇲" }, { name: "Namibia", country: "NA", code: "+264", iso: "NAM", flag: "🇳🇦" }, { name: "Nauru", country: "NR", code: "+674", iso: "NRU", flag: "🇳🇷" }, { name: "Nepal", country: "NP", code: "+977", iso: "NPL", flag: "🇳🇵" }, { name: "Netherlands", country: "NL", code: "+31", iso: "NLD", flag: "🇳🇱" }, { name: "New Zealand", country: "NZ", code: "+64", iso: "NZL", flag: "🇳🇿" }, { name: "Nicaragua", country: "NI", code: "+505", iso: "NIC", flag: "🇳🇮" }, { name: "Niger", country: "NE", code: "+227", iso: "NER", flag: "🇳🇪" }, { name: "Nigeria", country: "NG", code: "+234", iso: "NGA", flag: "🇳🇬" }, { name: "North Korea", country: "KP", code: "+850", iso: "PRK", flag: "🇰🇵" }, { name: "North Macedonia", country: "MK", code: "+389", iso: "MKD", flag: "🇲🇰" }, { name: "Norway", country: "NO", code: "+47", iso: "NOR", flag: "🇳🇴" }, { name: "Oman", country: "OM", code: "+968", iso: "OMN", flag: "🇴🇲" }, { name: "Pakistan", country: "PK", code: "+92", iso: "PAK", flag: "🇵🇰" }, { name: "Palau", country: "PW", code: "+680", iso: "PLW", flag: "🇵🇼" }, { name: "Palestine", country: "PS", code: "+970", iso: "PSE", flag: "🇵🇸" }, { name: "Panama", country: "PA", code: "+507", iso: "PAN", flag: "🇵🇦" }, { name: "Papua New Guinea", country: "PG", code: "+675", iso: "PNG", flag: "🇵🇬" }, { name: "Paraguay", country: "PY", code: "+595", iso: "PRY", flag: "🇵🇾" }, { name: "Peru", country: "PE", code: "+51", iso: "PER", flag: "🇵🇪" }, { name: "Philippines", country: "PH", code: "+63", iso: "PHL", flag: "🇵🇭" }, { name: "Poland", country: "PL", code: "+48", iso: "POL", flag: "🇵🇱" }, { name: "Portugal", country: "PT", code: "+351", iso: "PRT", flag: "🇵🇹" }, { name: "Qatar", country: "QA", code: "+974", iso: "QAT", flag: "🇶🇦" }, { name: "Romania", country: "RO", code: "+40", iso: "ROU", flag: "🇷🇴" }, { name: "Russia", country: "RU", code: "+7", iso: "RUS", flag: "🇷🇺" }, { name: "Rwanda", country: "RW", code: "+250", iso: "RWA", flag: "🇷🇼" }, { name: "Saint Kitts and Nevis", country: "KN", code: "+1-869", iso: "KNA", flag: "🇰🇳" }, { name: "Saint Lucia", country: "LC", code: "+1-758", iso: "LCA", flag: "🇱🇨" }, { name: "Samoa", country: "WS", code: "+685", iso: "WSM", flag: "🇼🇸" }, { name: "San Marino", country: "SM", code: "+378", iso: "SMR", flag: "🇸🇲" }, { name: "Sao Tome and Principe", country: "ST", code: "+239", iso: "STP", flag: "🇸🇹" }, { name: "Saudi Arabia", country: "SA", code: "+966", iso: "SAU", flag: "🇸🇦" }, { name: "Senegal", country: "SN", code: "+221", iso: "SEN", flag: "🇸🇳" }, { name: "Serbia", country: "RS", code: "+381", iso: "SRB", flag: "🇷🇸" }, { name: "Seychelles", country: "SC", code: "+248", iso: "SYC", flag: "🇸🇨" }, { name: "Sierra Leone", country: "SL", code: "+232", iso: "SLE", flag: "🇸🇱" }, { name: "Singapore", country: "SG", code: "+65", iso: "SGP", flag: "🇸🇬" }, { name: "Slovakia", country: "SK", code: "+421", iso: "SVK", flag: "🇸🇰" }, { name: "Slovenia", country: "SI", code: "+386", iso: "SVN", flag: "🇸🇮" }, { name: "Solomon Islands", country: "SB", code: "+677", iso: "SLB", flag: "🇸🇧" }, { name: "Somalia", country: "SO", code: "+252", iso: "SOM", flag: "🇸🇴" }, { name: "South Africa", country: "ZA", code: "+27", iso: "ZAF", flag: "🇿🇦" }, { name: "South Korea", country: "KR", code: "+82", iso: "KOR", flag: "🇰🇷" }, { name: "South Sudan", country: "SS", code: "+211", iso: "SSD", flag: "🇸🇸" }, { name: "Spain", country: "ES", code: "+34", iso: "ESP", flag: "🇪🇸" }, { name: "Sri Lanka", country: "LK", code: "+94", iso: "LKA", flag: "🇱🇰" }, { name: "Sudan", country: "SD", code: "+249", iso: "SDN", flag: "🇸🇩" }, { name: "Suriname", country: "SR", code: "+597", iso: "SUR", flag: "🇸🇷" }, { name: "Sweden", country: "SE", code: "+46", iso: "SWE", flag: "🇸🇪" }, { name: "Switzerland", country: "CH", code: "+41", iso: "CHE", flag: "🇨🇭" }, { name: "Syria", country: "SY", code: "+963", iso: "SYR", flag: "🇸🇾" }, { name: "Taiwan", country: "TW", code: "+886", iso: "TWN", flag: "🇹🇼" }, { name: "Tajikistan", country: "TJ", code: "+992", iso: "TJK", flag: "🇹🇯" }, { name: "Tanzania", country: "TZ", code: "+255", iso: "TZA", flag: "🇹🇿" }, { name: "Thailand", country: "TH", code: "+66", iso: "THA", flag: "🇹🇭" }, { name: "Timor-Leste", country: "TL", code: "+670", iso: "TLS", flag: "🇹🇱" }, { name: "Togo", country: "TG", code: "+228", iso: "TGO", flag: "🇹🇬" }, { name: "Tonga", country: "TO", code: "+676", iso: "TON", flag: "🇹🇴" }, { name: "Trinidad and Tobago", country: "TT", code: "+1-868", iso: "TTO", flag: "🇹🇹" }, { name: "Tunisia", country: "TN", code: "+216", iso: "TUN", flag: "🇹🇳" }, { name: "Turkey", country: "TR", code: "+90", iso: "TUR", flag: "🇹🇷" }, { name: "Turkmenistan", country: "TM", code: "+993", iso: "TKM", flag: "🇹🇲" }, { name: "Tuvalu", country: "TV", code: "+688", iso: "TUV", flag: "🇹🇻" }, { name: "Uganda", country: "UG", code: "+256", iso: "UGA", flag: "🇺🇬" }, { name: "Ukraine", country: "UA", code: "+380", iso: "UKR", flag: "🇺🇦" }, { name: "United Arab Emirates", country: "AE", code: "+971", iso: "ARE", flag: "🇦🇪" }, { name: "United Kingdom", country: "GB", code: "+44", iso: "GBR", flag: "🇬🇧" }, { name: "United States", country: "US", code: "+1", iso: "USA", flag: "🇺🇸" }, { name: "Uruguay", country: "UY", code: "+598", iso: "URY", flag: "🇺🇾" }, { name: "Uzbekistan", country: "UZ", code: "+998", iso: "UZB", flag: "🇺🇿" }, { name: "Vanuatu", country: "VU", code: "+678", iso: "VUT", flag: "🇻🇺" }, { name: "Vatican City", country: "VA", code: "+379", iso: "VAT", flag: "🇻🇦" }, { name: "Venezuela", country: "VE", code: "+58", iso: "VEN", flag: "🇻🇪" }, { name: "Vietnam", country: "VN", code: "+84", iso: "VNM", flag: "🇻🇳" }, { name: "Yemen", country: "YE", code: "+967", iso: "YEM", flag: "🇾🇪" }, { name: "Zambia", country: "ZM", code: "+260", iso: "ZMB", flag: "🇿🇲" }, { name: "Zimbabwe", country: "ZW", code: "+263", iso: "ZWE", flag: "🇿🇼" },
];

export const formatPhoneNumber = (code: string, number: string): string => {
    const digitsOnly = number.replace(/\D/g, "");
    const codeDigits = code.replace(/\D/g, "");
    const numberWithoutLeadingZero = digitsOnly.startsWith("0") ? digitsOnly.substring(1) : digitsOnly;
    return `+${codeDigits}${numberWithoutLeadingZero}`;
}

const tanzaniaRegions: Record<string, string[]> = {
    "Arusha": ["Arusha City", "Arusha Rural", "Karatu", "Longido", "Meru", "Monduli", "Ngorongoro"], "Dar es Salaam": ["Ilala", "Kinondoni", "Temeke", "Kigamboni", "Ubungo"], "Dodoma": ["Bahi", "Chamwino", "Chemba", "Dodoma City", "Kondoa", "Kongwa", "Mpwapwa"], "Geita": ["Bukombe", "Chato", "Geita Town", "Mbogwe", "Nyang'hwale"], "Iringa": ["Iringa Rural", "Iringa Urban", "Kilolo", "Mufindi"], "Kagera": ["Biharamulo", "Bukoba Rural", "Bukoba Urban", "Karagwe", "Kyerwa", "Missenyi", "Muleba", "Ngara"], "Katavi": ["Mlele", "Mpanda Rural", "Mpanda Urban"], "Kigoma": ["Buhigwe", "Kakonko", "Kasulu Rural", "Kasulu Urban", "Kibondo", "Kigoma Rural", "Kigoma Urban", "Uvinza"], "Kilimanjaro": ["Hai", "Moshi Rural", "Moshi Urban", "Mwanga", "Rombo", "Same", "Siha"], "Lindi": ["Kilwa", "Lindi Rural", "Lindi Urban", "Liwale", "Nachingwea", "Ruangwa"], "Manyara": ["Babati Rural", "Babati Urban", "Hanang", "Kiteto", "Mbulu", "Simanjiro"], "Mara": ["Bunda", "Butiama", "Musoma Rural", "Musoma Urban", "Rorya", "Serengeti", "Tarime"], "Mbeya": ["Busokelo", "Chunya", "Kyela", "Mbarali", "Mbeya City", "Mbeya Rural", "Rungwe"], "Morogoro": ["Gairo", "Kilombero", "Kilosa", "Morogoro Rural", "Morogoro Urban", "Mvomero", "Ulanga"], "Mtwara": ["Masasi", "Mtwara Rural", "Mtwara Urban", "Nanyumbu", "Newala", "Tandahimba"], "Mwanza": ["Ilemela", "Kwimba", "Magu", "Misungwi", "Nyamagana", "Sengerema", "Ukerewe"], "Njombe": ["Ludewa", "Makambako Town", "Makete", "Njombe Rural", "Njombe Urban", "Wanging'ombe"], "Pwani": ["Bagamoyo", "Kibaha Rural", "Kibaha Urban", "Kisarawe", "Mafia", "Mkuranga", "Rufiji"], "Rukwa": ["Kalambo", "Nkasi", "Sumbawanga Rural", "Sumbawanga Urban"], "Ruvuma": ["Mbinga", "Namtumbo", "Nyasa", "Songea Rural", "Songea Urban", "Tunduru"], "Shinyanga": ["Kahama Rural", "Kahama Urban", "Kishapu", "Shinyanga Rural", "Shinyanga Urban"], "Simiyu": ["Bariadi", "Busega", "Itilima", "Maswa", "Meatu"], "Singida": ["Ikungi", "Iramba", "Manyoni", "Mkalama", "Singida Rural", "Singida Urban"], "Songwe": ["Ileje", "Mbozi", "Momba", "Songwe"], "Tabora": ["Igunga", "Kaliua", "Nzega", "Sikonge", "Tabora Urban", "Urambo", "Uyui"], "Tanga": ["Bumbuli", "Handeni Rural", "Handeni Urban", "Kilindi", "Korogwe", "Lushoto", "Mkinga", "Muheza", "Pangani", "Tanga City"],
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ PHONE INPUT COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
interface PhoneInputProps {
  countryCode: string; phoneNumber: string; onCountryCodeChange: (code: string) => void; onPhoneNumberChange: (number: string) => void; selectedCountryIso: string; onSelectedCountryChange: (iso: string) => void; label?: string; placeholder?: string; required?: boolean;
}

function PhoneInput({
  countryCode, phoneNumber, onCountryCodeChange, onPhoneNumberChange, selectedCountryIso, onSelectedCountryChange,
  label = "Phone Number", placeholder = "712 345 678", required = false
}: PhoneInputProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const selectedCountry = countries.find(c => c.iso === selectedCountryIso)
  const filteredCountries = searchQuery ? countries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.includes(searchQuery)) : countries

  const handleCountrySelect = (value: string) => {
    const [code, iso] = value.split("|")
    onCountryCodeChange(code)
    onSelectedCountryChange(iso)
  }
  
  const getCountryValue = (country: Country) => `${country.code}|${country.iso}`

  return (
    <div className="space-y-1">
      <Label htmlFor="phone">{label} *</Label>
      <div className="flex">
        <Select value={selectedCountry ? getCountryValue(selectedCountry) : ""} onValueChange={handleCountrySelect} onOpenChange={setIsOpen}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Code">
              {selectedCountry && <div className="flex items-center gap-2 text-sm"><span>{selectedCountry.flag}</span><span>{selectedCountry.code}</span></div>}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <div className="p-2"><Input placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full" /></div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.map(country => (
                <SelectItem key={country.iso} value={getCountryValue(country)}>
                  <div className="flex items-center gap-2 text-sm"><span>{country.flag}</span><span>{country.name}</span><span className="text-gray-500">{country.code}</span></div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
        <Input id="phone" type="tel" placeholder={placeholder} value={phoneNumber} onChange={e => onPhoneNumberChange(e.target.value)} required={required} />
      </div>
    </div>
  )
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN REGISTER PAGE COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function RegisterPage() {
  const [accountType, setAccountType] = useState<"student" | "school" | null>(null)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <BookOpen className="h-10 w-10 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">Kasome</span>
          </Link>
          <p className="text-gray-600 mt-2">Join thousands of students learning with Kasome</p>
        </div>
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Create Your Account</CardTitle>
            <p className="text-center text-gray-600">Choose your account type to get started</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!accountType ? ( <AccountTypeSelector onSelect={setAccountType} /> ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{accountType === "student" ? "Student Registration" : "School Registration"}</h3>
                  <Button variant="ghost" onClick={() => setAccountType(null)} className="text-green-600 hover:text-green-700">Change Account Type</Button>
                </div>
                {accountType === "student" ? <StudentRegistrationForm /> : <SchoolRegistrationForm />}
              </div>
            )}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">Already have an account?{" "}<Link href="/login" className="text-green-600 hover:underline font-semibold">Login</Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ SUB-COMPONENTS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function ApiFeedback({ type, message }: { type: 'success' | 'error'; message: string | null }) {
    if (!message) return null;
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
    const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const Icon = isSuccess ? CheckCircle2 : AlertTriangle;
    return (
        <div className={`p-3 rounded-md border ${bgColor} ${borderColor} ${textColor}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <div className="ml-3"><p className="text-sm font-medium">{message}</p></div>
            </div>
        </div>
    );
}

function AccountTypeSelector({ onSelect }: { onSelect: (type: "student" | "school") => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => onSelect("student")} className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all group">
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200"><User className="h-8 w-8 text-green-600" /></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Account</h3>
                <p className="text-gray-600 text-sm mb-4">Access video lessons, track your progress, and learn at your own pace</p>
                <ul className="text-sm text-left text-gray-500 space-y-1 list-disc list-inside">
                    <li>Access to free and premium courses</li><li>Progress tracking</li><li>Mobile app access</li><li>Certificate of completion</li>
                </ul>
            </div>
        </div>
        <div onClick={() => onSelect("school")} className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all group">
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200"><School className="h-8 w-8 text-green-600" /></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">School Account</h3>
                <p className="text-gray-600 text-sm mb-4">Manage multiple students, access analytics, and bulk course purchases</p>
                <ul className="text-sm text-left text-gray-500 space-y-1 list-disc list-inside">
                    <li>Student management dashboard</li><li>Bulk course purchases</li><li>Progress analytics</li><li>Priority support</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

function StudentRegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", countryCode: "+255", phoneNumber: "", selectedCountryIso: "TZA", 
    dob: "", region: "", district: "", gender: "", password: "", confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const handlePhoneInputChange = (number: string) => {
    const digitsOnly = number.replace(/\D/g, "");
    const withoutLeadingZero = digitsOnly.startsWith("0") ? digitsOnly.substring(1) : digitsOnly;
    setFormData(prev => ({ ...prev, phoneNumber: withoutLeadingZero }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      if (passwordError) setPasswordError(null);
      if (apiError) setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match. Please try again.");
      return;
    }
    setPasswordError(null); setApiError(null); setApiSuccess(null);
    setIsSubmitting(true);
    
    const fullPhoneNumber = formatPhoneNumber(formData.countryCode, formData.phoneNumber);
    const phoneForApi = fullPhoneNumber.substring(1);

    const requestBody = {
        fname: formData.firstName,
        lname: formData.lastName,
        phone: phoneForApi,
        email: `${phoneForApi}@kasome.app`,
        password: formData.password,
        region: formData.region,
        user_type: "student",
        district: formData.district,
        gender: formData.gender,
        dob: formData.dob,
    };

    try {
        const response = await fetch("http://45.79.205.240/api/users/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (response.ok && data.status === "SUCCESS") {
            setApiSuccess(data.message || "Registration successful! Redirecting to login...");
            localStorage.setItem('auth_token', data.token);
            setTimeout(() => router.push('/login'), 2000);
        } else {
            setApiError(data.message || "An unknown error occurred.");
        }
    } catch (error) {
        setApiError("Could not connect to the server. Please check your internet connection.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label htmlFor="firstName">First Name *</Label><Input id="firstName" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="Enter your first name" /></div>
        <div><Label htmlFor="lastName">Last Name *</Label><Input id="lastName" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Enter your last name" /></div>
      </div>
      <PhoneInput 
        countryCode={formData.countryCode} phoneNumber={formData.phoneNumber} selectedCountryIso={formData.selectedCountryIso}
        onCountryCodeChange={code => setFormData(prev => ({ ...prev, countryCode: code }))}
        onPhoneNumberChange={handlePhoneInputChange}
        onSelectedCountryChange={iso => setFormData(prev => ({ ...prev, selectedCountryIso: iso }))}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="region">Region *</Label>
          <Select required value={formData.region} onValueChange={region => setFormData({ ...formData, region, district: "" })}>
            <SelectTrigger id="region"><SelectValue placeholder="Select Region" /></SelectTrigger>
            <SelectContent><div className="max-h-60 overflow-y-auto">{Object.keys(tanzaniaRegions).sort().map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}</div></SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="district">District *</Label>
          <Select required disabled={!formData.region} value={formData.district} onValueChange={district => setFormData({ ...formData, district })}>
            <SelectTrigger id="district"><SelectValue placeholder="Select District" /></SelectTrigger>
            <SelectContent><div className="max-h-60 overflow-y-auto">{formData.region && tanzaniaRegions[formData.region].sort().map(district => <SelectItem key={district} value={district}>{district}</SelectItem>)}</div></SelectContent>
          </Select>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input id="dob" type="date" required value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
        </div>
        <div>
          <Label className="block mb-2">Gender *</Label>
          <div className="flex space-x-6 items-center h-10">
              <Label className="flex items-center font-normal"><input type="radio" name="gender" value="male" required checked={formData.gender === "male"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="mr-2 text-green-600 focus:ring-green-500" /> Male</Label>
              <Label className="flex items-center font-normal"><input type="radio" name="gender" value="female" required checked={formData.gender === "female"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="mr-2 text-green-600 focus:ring-green-500" /> Female</Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <Label htmlFor="password">Password *</Label>
            <Input id="password" name="password" type="password" required value={formData.password} onChange={handlePasswordChange} placeholder="Create a password" />
        </div>
        <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm your password" />
        </div>
      </div>
      {passwordError && <p className="text-sm text-red-600 -mt-2">{passwordError}</p>}
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Student Account" }
      </Button>
      <div className="h-16">
          <ApiFeedback type="success" message={apiSuccess} />
          <ApiFeedback type="error" message={apiError} />
      </div>
    </form>
  )
}

function SchoolRegistrationForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({ 
        schoolName: "", email: "", countryCode: "+255", phoneNumber: "", selectedCountryIso: "TZA", region: "", district: "", password: "", confirmPassword: "" 
    });
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [apiSuccess, setApiSuccess] = useState<string | null>(null);

    const handlePhoneInputChange = (number: string) => {
        const digitsOnly = number.replace(/\D/g, "");
        const withoutLeadingZero = digitsOnly.startsWith("0") ? digitsOnly.substring(1) : digitsOnly;
        setFormData(prev => ({ ...prev, phoneNumber: withoutLeadingZero }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      if (passwordError) setPasswordError(null);
      if (apiError) setApiError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match. Please try again.");
            return;
        }
        setPasswordError(null); setApiError(null); setApiSuccess(null);
        setIsSubmitting(true);
        
        const fullPhoneNumber = formatPhoneNumber(formData.countryCode, formData.phoneNumber);
        const phoneForApi = fullPhoneNumber.substring(1);

        const requestBody = {
            fname: formData.schoolName,
            lname: "",
            phone: phoneForApi,
            email: formData.email,
            password: formData.password,
            region: formData.region,
            user_type: "school",
            district: formData.district,
            gender: "male",
            dob: "1990-01-01",
        };

        try {
            const response = await fetch("http://45.79.205.240/api/users/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            if (response.ok && data.status === "SUCCESS") {
                setApiSuccess(data.message || "Registration successful! Redirecting to login...");
                localStorage.setItem('auth_token', data.token);
                setTimeout(() => router.push('/login'), 2000);
            } else {
                setApiError(data.message || "An unknown error occurred.");
            }
        } catch (error) {
            setApiError("Could not connect to the server.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><Label htmlFor="schoolName">School Name *</Label><Input id="schoolName" required placeholder="Enter school name" value={formData.schoolName} onChange={e => setFormData(p => ({...p, schoolName: e.target.value}))}/></div>
        <div><Label htmlFor="email">Email Address *</Label><Input id="email" type="email" required placeholder="Enter school email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}/></div>
        <PhoneInput 
            label="School Phone Number"
            countryCode={formData.countryCode} phoneNumber={formData.phoneNumber} selectedCountryIso={formData.selectedCountryIso}
            onCountryCodeChange={code => setFormData(prev => ({ ...prev, countryCode: code }))}
            onPhoneNumberChange={handlePhoneInputChange}
            onSelectedCountryChange={iso => setFormData(prev => ({ ...prev, selectedCountryIso: iso }))}
            required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="s-region">Region *</Label>
                <Select required value={formData.region} onValueChange={region => setFormData(p => ({ ...p, region, district: "" }))}>
                    <SelectTrigger id="s-region"><SelectValue placeholder="Select Region" /></SelectTrigger>
                    <SelectContent><div className="max-h-60 overflow-y-auto">{Object.keys(tanzaniaRegions).sort().map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}</div></SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="s-district">District *</Label>
                <Select required disabled={!formData.region} value={formData.district} onValueChange={district => setFormData(p => ({ ...p, district }))}>
                    <SelectTrigger id="s-district"><SelectValue placeholder="Select District" /></SelectTrigger>
                    <SelectContent><div className="max-h-60 overflow-y-auto">{formData.region && tanzaniaRegions[formData.region].sort().map(district => <SelectItem key={district} value={district}>{district}</SelectItem>)}</div></SelectContent>
                </Select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="s-password">Password *</Label>
                <Input id="s-password" name="password" type="password" required placeholder="Create a password" value={formData.password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <Label htmlFor="s-confirmPassword">Confirm Password *</Label>
                <Input id="s-confirmPassword" name="confirmPassword" type="password" required placeholder="Confirm password" value={formData.confirmPassword} onChange={handlePasswordChange}/>
            </div>
        </div>
        {passwordError && <p className="text-sm text-red-600 -mt-2">{passwordError}</p>}
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create School Account"}
        </Button>
         <div className="h-16">
          <ApiFeedback type="success" message={apiSuccess} />
          <ApiFeedback type="error" message={apiError} />
      </div>
      </form>
    )
}