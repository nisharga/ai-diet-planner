import Button from "@/components/shared/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Meeting = () => {
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await AsyncStorage.getItem("event");
      if (data) setEvent(JSON.parse(data));
    };
    loadEvent();
  }, []);

  if (!event || !event.items || event.items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No event data found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <CreateMeeting />
      <Text style={styles.header}>📅 Other Meeting Details</Text>
      {event.items?.map((meeting: any, index: number) => (
        <View key={index}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {meeting.summary || "Untitled Meeting"}
            </Text>
            <Text style={styles.date}>
              🕒 {meeting.start?.dateTime || meeting.start?.date} →{" "}
              {meeting.end?.dateTime || meeting.end?.date}
            </Text>

            {meeting.description ? (
              <Text style={styles.description}>{meeting.description}</Text>
            ) : (
              <Text style={styles.descriptionEmpty}>
                No description provided
              </Text>
            )}

            <View style={styles.section}>
              <Text style={styles.label}>Organizer:</Text>
              <Text style={styles.value}>
                {meeting.organizer?.email || event.summary}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{meeting.status}</Text>
            </View>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => {
                import("expo-linking").then((Linking) =>
                  Linking.openURL(meeting.htmlLink)
                );
              }}
            >
              <Text style={styles.linkText}>🔗 Open in Google Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Meeting;

const CreateMeeting = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const createEvent = async () => {
    const token = await AsyncStorage.getItem("accessToken"); // store token after login
    console.log("🚀 ~ createEvent ~ token:", token);
    if (!token) return Alert.alert("Error", "No access token found!");

    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: "2025-08-25T10:00:00+06:00", // e.g. "2025-08-24T10:00:00-07:00"
        timeZone: "Asia/Dhaka",
      },
      end: {
        dateTime: "2025-08-25T11:00:00+06:00",
        timeZone: "Asia/Dhaka",
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      const data = await response.json();
      console.log("🚀 ~ createEvent ~ dataaaa:", data);

      if (data.id) {
        Alert.alert("✅ Success", "Meeting created!");
      } else {
        console.error(data);
        Alert.alert("❌ Failed", "Could not create meeting.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Create Meeting</Text>
      <TextInput
        placeholder="Meeting Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Start DateTime (YYYY-MM-DDTHH:mm:ssZ)"
        value={start}
        onChangeText={setStart}
        style={styles.input}
      />
      <TextInput
        placeholder="End DateTime (YYYY-MM-DDTHH:mm:ssZ)"
        value={end}
        onChangeText={setEnd}
        style={styles.input}
      />
      <Button title="Create Meeting" onPress={createEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  descriptionEmpty: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#aaa",
    marginBottom: 16,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  value: {
    color: "#333",
  },
  linkButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#4285F4",
    borderRadius: 8,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontWeight: "600",
  },
});
