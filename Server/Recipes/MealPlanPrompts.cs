namespace MyApp.Prompts;

public static class MealPlanPrompts
{
    public static string EachDay(List<string> fridge, List<string> freezer, string extraPrompt, int persons)
    {
        return $"""
        Generer en ugentlig madplan med præcis 7 opskrifter.
        
        Brug disse dage i madplanen:
        Mandag, Tirsdag, Onsdag, Torsdag, Fredag, Lørdag, Søndag

        Hver dag skal være en opskrift til {persons} personer.

        Foretræk at bruge ingredienser fra mit køleskab:
        {string.Join(", ", fridge)}

        Foretræk at bruge ingredienser fra min fryser:
        {string.Join(", ", freezer)}

        Hvis en ingrediens fra køleskab eller fryser allerede er brugt i en tidligere opskrift, må den ikke bruges igen i resten af madplanen.

        Andre ingredienser må meget gerne også tilføjes hvis det passer godt ind i opskrifterne.

        Ekstra ønsker eller præferencer:
        {extraPrompt}

        Husk at tilføje både forberedelsestid, tilberedningstid (som skal under bake_time_minutes i schema) og totale tid.

        Returner en JSON-array med 7 objekter der matcher schema.
        """;
    }

    public static string TwoDay(List<string> fridge, List<string> freezer, string extraPrompt, int persons)
    {
        return $"""
        Generer en ugentlig madplan med præcis 4 opskrifter.

        Brug disse dage:
        Mandag, Onsdag, Fredag, Søndag

        Opskrifterne til mandag, onsdag og fredag skal være en opskrift til {persons*2} personer.

        Opskriften til søndag skal være en opskrift til {persons} personer.

        Foretræk at bruge ingredienser fra mit køleskab:
        {string.Join(", ", fridge)}

        Foretræk at bruge ingredienser fra min fryser:
        {string.Join(", ", freezer)}

        Hvis en ingrediens fra køleskab eller fryser allerede er brugt i en tidligere opskrift, må den ikke bruges igen i resten af madplanen.

        Andre ingredienser må meget gerne også tilføjes hvis det passer godt ind i opskrifterne.

        Ekstra ønsker eller præferencer:
        {extraPrompt}

        Husk at tilføje både forberedelsestid, tilberedningstid (som skal under bake_time_minutes i schema) og totale tid.

        Returner en JSON-array med 4 objekter der matcher schema.
        """;
    }
}