import { useState } from "react";
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
  Paper,
  Stack,
} from "@mantine/core";
import { useAppDispatch } from "@/state/redux-hooks";
import {
  segment,
  setCurrentSegment,
  setRemainingTime,
  setSegmentsObject,
  setSegmentTime,
  setTimerStatus,
  setTotalTime,
} from "@/state/reducers/timer";

const SegmentManager = () => {
  const dispatch = useAppDispatch();
  const [segments, setSegments] = useState([
    { duration: 600, color: "#5FA69B", label: "10 min" },
    { duration: 180, color: "#5FA69B", label: "3 min" },
  ]);
  const [newSegment, setNewSegment] = useState({
    duration: 0,
    color: "#5FA69B",
    label: "",
  });

  const addSegment = () => {
    setSegments([...segments, newSegment]);
    setNewSegment({ duration: 0, color: "#5FA69B", label: "" });
  };

  const removeSegment = (index: number) => {
    setSegments(segments.filter((_, i) => i !== index));
  };

  const setSegment = () => {
    const totalTime = segments.reduce(
      (acc: number, segment: segment) => acc + segment.duration,
      0
    );

    dispatch(setSegmentsObject(segments.reverse()));
    dispatch(setCurrentSegment(segments.length - 1));
    dispatch(setSegmentTime(segments[segments.length - 1].duration));
    dispatch(setRemainingTime(totalTime));
    dispatch(setTimerStatus("pause"));
    dispatch(setTotalTime(totalTime));
  };

  return (
    <Box p="lg" mx="auto" w="300px">
      <Stack>
        {segments.map((segment, index) => (
          <Paper
            key={index}
            shadow="xs"
            p="sm"
            style={{ backgroundColor: segment.color }}
            className="bg-gradient-to-r from-[#5FA69B] to-[#0083AA  ]"
          >
            <Group>
              <div>
                <strong>{segment.label}</strong> - {segment.duration} seconds
              </div>
              <Button color="red" onClick={() => removeSegment(index)}>
                Remove
              </Button>
            </Group>
          </Paper>
        ))}

        <Paper p="md" shadow="sm">
          <h3>Add New Segment</h3>
          <Group>
            <TextInput
              placeholder="Label"
              value={newSegment.label}
              onChange={(event) =>
                setNewSegment({
                  ...newSegment,
                  label: event.currentTarget.value,
                })
              }
            />
            <NumberInput
              placeholder="Duration (seconds)"
              value={newSegment.duration}
              onChange={(value) =>
                setNewSegment({ ...newSegment, duration: Number(value) })
              }
              min={0}
            />
            {/* <ColorInput
              placeholder="Color"
              value={newSegment.color}
              onChange={(color) => setNewSegment({ ...newSegment, color })}
              swatches={[
                "#2e2e2e",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            /> */}
          </Group>
          <Button fullWidth mt="sm" onClick={addSegment} color="#0083aa">
            Add Segment
          </Button>
          <Button fullWidth mt="sm" onClick={setSegment} color="red">
            Set Timmer
          </Button>
        </Paper>
      </Stack>
    </Box>
  );
};

export default SegmentManager;
